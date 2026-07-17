import { Request, Response } from "express";
import mongoose from "mongoose";
import { randomUUID } from "node:crypto";
import { memberService } from "./Member.Service";
import SendResponse from "../../../utils/SendResponse";
import { authService } from "../Auth/Auth.Service";
import { randomBytes } from "crypto";
import { ROLE_CONSTANT } from "../Auth/Auth.Constant";
import { memberUtils } from "./Member.Utils";
import { permissionService } from "../Permission/Permission.service";
import { Member_Permissions } from "../Permission/Permission.constant";

import slugify from "slugify";
import MemberChannel from "./Member.Channel";

class MemberController {
  createNewMember = async (req: Request, res: Response) => {
    let userId = (req as Request & { userId?: string }).userId;

    let checkPermissions = await permissionService.check_UserPermission(
      String(userId),
      Member_Permissions.CREATE_MEMBER,
    );

    if (!checkPermissions) {
      throw new Error("Forbidden: You don't have permission to create members");
    }

    const session = await mongoose.startSession();

    session.startTransaction();
    try {
      const {
        firstName,
        lastName,
        email,
        Bio,
        imageUrl,
        publicProfileUrl = "",

        location = {
          city: "",
          state: "",
          country: "",
          pinCode: "",
        },

        socialLinks = {
          linkedin: "",
          github: "",
          twitter: "",
          website: "",
          instagram: "",
          youtube: "",
          portfolio: "",
          medium: "",
        },

        skills = [],
        areaOfInterest = [],
        internalNotes = "",

        membershipStatus = "On Boarding",
        onboardingSource = "website",
        primaryRole = ROLE_CONSTANT.PARTICIPANT,
      } = req.body;

      const isMemberExist = await memberUtils.Is_Member_Exist(email);

      if (isMemberExist) {
        throw new Error("Member already exists");
      }

      const randomPassword = randomBytes(7).toString("hex");

      console.log("Random Password:", randomPassword);

      const auth = await authService.createUser({
        email,
        passwordHash: randomPassword,
        failedLoginAttempts: 0,
        isBanned: false,
        role: primaryRole,
        emailVerified: false,
      });

      const createNewMember = await memberService.createNewMember({
        Slug: slugify(`gdg-ranchi-${randomUUID().slice(0, 5)}`, {
          lower: true,
          strict: true,
          trim: true,
        }),

        firstName,
        lastName,
        email,
        Bio,

        imageUrl:
          imageUrl ??
          "https://img.freepik.com/premium-vector/boy-with-sweater-that-says-hes-boy_1230457-43137.jpg?w=360",

        AuthId: auth._id.toString(),

        membershipStatus,
        onboardingSource,
        primaryRole,

        location,

        socialLinks,

        skills,

        areaOfInterest,

        internalNotes,
      });

      await MemberChannel.sendOnboardingEmail({
        firstName,
        lastName,
        email,
        primaryRole,
        randomPassword,
      });

      await session.commitTransaction();
      session.endSession();
      return SendResponse.SuccessResponse(
        res,
        {
          memberId: createNewMember._id,
          status: createNewMember.membershipStatus,
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
        Member_Permissions.VIEW_MEMBER,
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
