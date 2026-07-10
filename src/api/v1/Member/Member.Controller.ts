import { Request, Response } from "express";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { memberService } from "./Member.Service";
import SendResponse from "../../../utils/SendResponse";
import { authService } from "../Auth/Auth.Service";
import { randomBytes } from "crypto";
import { ROLE_CONSTANT } from "../Auth/Auth.Constant";
import { memberUtils } from "./Member.Utils";
import { permissionService } from "../Permission/Permission.service";
import { memberPermission } from "../Permission/Permission.constant";

import slugify from "slugify";
import EmailUtils from "../../../utils/Email.utils";

// import { memberPermission } from "../Permission/Permission.constant";

class MemberController {
  createNewMember = async (req: Request, res: Response) => {
    let userId = (req as Request & { userId?: string }).userId;

    let checkPermissions = await permissionService.check_UserPermission(
      String(userId),
      memberPermission.CREATE_MEMBER,
    );

    if (!checkPermissions) {
      throw new Error("Forbidden: You don't have permission to create members");
    }

    const session = await mongoose.startSession();

    session.startTransaction();
    try {
      const {
        email,
        firstName,
        lastName,
        location = "",
        skills = [],
        areaOfInterest = [],
        internalNotes = "",
        publicProfileUrl = "",
        imageUrl,
        membershipStatus = "On Boarding",
        onboardingSource = "website",
        primaryRole = ROLE_CONSTANT.PARTICIPANT,
      } = req.body;

      const isMemberExist = await memberUtils.Is_Member_Exist(email);

      if (isMemberExist) {
        throw new Error("Member already exists");
      }
      const randomPassword = randomBytes(7).toString("hex");

      let emailTemplate = await memberUtils.INVITE_MEMBER_TEMPORARY(
        email,
        firstName + " " + lastName,
        primaryRole,
        randomPassword,
      );

      console.log("random password ---> ", randomPassword);

      const Auth = await authService.createUser({
        email,
        passwordHash: randomPassword,
        failedLoginAttempts: 0,
        isBanned: false,
        role: primaryRole,
        emailVerified: false,
      });

      const CreateNewMember = await memberService.createNewMember({
        Slug: slugify("gdg-ranchi" + "-" + nanoid(8), {
          lower: true,
          strict: true,
          trim: true,
        }),
        firstName,
        lastName,
        imageUrl:
          imageUrl ||
          "https://img.freepik.com/premium-vector/boy-with-sweater-that-says-hes-boy_1230457-43137.jpg?w=360",
        publicProfileUrl,
        email,
        AuthId: String(Auth._id),
        membershipStatus,
        onboardingSource,
        primaryRole,
        location,
        skills,
        areaOfInterest,
        internalNotes,
      });

      await EmailUtils.transporter().sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject:
          "Invitation to Join GDG Ranchi — Empower, Learn, and Innovate Together!",

        html: emailTemplate,
      });

      await session.commitTransaction();
      session.endSession();
      return SendResponse.SuccessResponse(
        res,
        {
          memberId: CreateNewMember._id,
          status: CreateNewMember.membershipStatus,
        },
        "New Member invited successfully. Please verify your email to activate your account.",
      );
    } catch (error: unknown) {
      await session.abortTransaction();
      session.endSession();
      console.error("Create Member Error:", error);
      let message = "Internal Server Error";
      let errorData: any = error;
      if (error instanceof Error) {
        message = error.message;
      }
      return SendResponse.ErrorResponse(res, errorData, message);
    }
  };

  findAllMembers = async (req: Request, res: Response) => {
    try {
      let userId = (req as Request & { userId?: string }).userId;

      let checkPermissions = await permissionService.check_UserPermission(
        String(userId),
        memberPermission.FIND_ALL_MEMBERS,
      );

      if (!checkPermissions) {
        throw new Error(
          "Forbidden: You don't have permission to find all members",
        );
      }

      let FindAllMembers = await memberUtils.FIND_ALL_Members();
      SendResponse.SuccessResponse(
        res,
        FindAllMembers,
        "All Members fetched successfully",
      );
    } catch (error) {
      SendResponse.ErrorResponse(
        res,
        error,
        error instanceof Error ? error.message : "Internal Server Error",
      );
    }
  };
}

export const memberController = new MemberController();
