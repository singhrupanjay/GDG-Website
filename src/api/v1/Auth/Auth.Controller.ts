import { Request, Response } from "express";
import crypto from "crypto";
import slugify from "slugify";

import SendResponse from "../../../utils/SendResponse";
import { cloudinaryUtils } from "../../../utils/Cloudinary.utils";
import { env_Constant } from "../../../constant/env.constant";

import { permissionService } from "../Permission/Permission.service";
import { communityService } from "../Community/Community.Service";
import { authService } from "./Auth.Service";
import { authUtils } from "./Auth.Utils";
import { AuthConstant, ROLE_CONSTANT } from "./Auth.Constant";
import { memberUtils } from "../Member/Member.Utils";
import AuthChannel from "./Auth.Channel.";
import { otpUtils } from "../OTP/OTP.Utils";
import { otpService } from "../OTP/OTP.Service";
import { OTPType } from "../OTP/Otp.Type";
import normalizeError from "../../../utils/normalizeError";

class AuthController {
  private setAuthCookies(
    res: Response,
    {
      accessToken,
      refreshToken,
    }: {
      accessToken: string;
      refreshToken: string;
    },
  ): void {
    const isProduction = env_Constant.NODE_ENV === "production";

    const cookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? ("none" as const) : ("lax" as const),
    };

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
      path: "/",
    });

    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/api/auth/refresh",
    });
  }

  public CommunitySignUp = async (
    req: Request,
    res: Response,
  ): Promise<Response | void> => {
    try {
      const {
        CommunityName,
        password,
        Bio,
        City,
        ContactPhone,
        Country,
        LogoUrl,
        OfficialEmail,
        Website,
        socialLinks,
      } = req.body;

      const existingUser = await authUtils.FIND_USER_BY_EMAIL(OfficialEmail);

      if (existingUser) {
        throw new Error(AuthConstant.USER_ALREADY_EXISTS);
      }

      const uploadedImage = req.file?.path
        ? await cloudinaryUtils.uploadImage(req.file.path)
        : null;

      const finalLogoUrl =
        uploadedImage?.secure_url ||
        LogoUrl ||
        "https://via.placeholder.com/150";

      const auth = await authService.createUser({
        email: OfficialEmail,
        passwordHash: password,
        failedLoginAttempts: 0,
        isBanned: false,
        role: ROLE_CONSTANT.ORGANIZATION,
        emailVerified: false,
      });

      const community = await communityService.createNewCommunity({
        OwnerID: String(auth._id),
        CommunityName,
        Slug: slugify(`${CommunityName}-${crypto.randomUUID()}`, {
          lower: true,
          strict: true,
          trim: true,
        }),
        Bio,
        City,
        ContactPhone,
        Members: [],
        Country,
        LogoUrl: finalLogoUrl,
        OfficialEmail,
        Website,
        Status: "pending",
        SocialLinks: socialLinks,
      });

      await permissionService.assignOrganizationPermissions(String(auth._id));

      return SendResponse.SuccessResponse(
        res,
        community,
        AuthConstant.COMMUNITY_ACCOUNT_CREATED,
      );
    } catch (error) {
      const Error = normalizeError(error);

      SendResponse.ErrorResponse(res, Error.errorData, Error.message);
    }
  };

  public LoginUser = async (
    req: Request,
    res: Response,
  ): Promise<Response | void> => {
    try {
      const { email, password } = req.body;

      const user = await authUtils.FIND_USER_BY_EMAIL(email);

      if (!user) {
        throw new Error(AuthConstant.USER_NOT_FOUND);
      }

      if (user.isBanned) {
        throw new Error(
          "Your account is temporarily unavailable. Please try again later.",
        );
      }

      const isPasswordValid = await authUtils.comparePassword(
        password,
        user.passwordHash,
      );

      if (!isPasswordValid) {
        const failedLoginAttempts = await authUtils.failedLoginAttempts(
          String(user._id),
        );

        if (failedLoginAttempts >= 5) {
          await authUtils.banUser(String(user._id));

          throw new Error(
            "Too many failed login attempts. Your account has been temporarily banned.",
          );
        }

        const attemptsLeft = Math.max(0, 5 - failedLoginAttempts);

        throw new Error(
          `Invalid password. You have ${attemptsLeft} attempt(s) remaining.`,
        );
      }

      const [member, permissions] = await Promise.all([
        memberUtils.FIND_Member_BY_EMAIL(user.email),
        permissionService.getPermissionsForUser(String(user._id)),
      ]);

      const tokens = await authUtils.generateAuthTokens({
        _id: String(user._id),
        email: user.email,
        role: user.role,
        ip: req.ip,
      });

      this.setAuthCookies(res, tokens);

      return SendResponse.SuccessResponse(
        res,
        {
          user,
          memberId: member?._id,
          permissions,
        },
        AuthConstant.LOGIN_SUCCESS,
      );
    } catch (error) {
      const Error = normalizeError(error);

      SendResponse.ErrorResponse(res, Error.errorData, Error.message);
    }
  };

  public ForgotPassword = async (
    req: Request,
    res: Response,
  ): Promise<Response | void> => {
    try {
      const { email } = req.body;

      const member = await memberUtils.FIND_Member_BY_EMAIL(email);

      if (!member) {
        throw new Error(AuthConstant.USER_NOT_FOUND);
      }

      const otp = await otpUtils.generateOTP(6);

      await otpService.createAndUpdateOtp(email, OTPType.PASSWORD_RESET, otp);

      await AuthChannel.sendOtp({
        purpose: "password_reset",
        actionText:
          "We received a request to reset your password. Please use the secure verification code to verify your identity and create a new password. If you did not request this change, you can safely ignore this email.",
        fullName: `${member.firstName} ${member.lastName}`,
        email,
        otp,
      });

      return SendResponse.SuccessResponse(
        res,
        null,
        "Password reset email sent successfully.",
      );
    } catch (error) {
      const Error = normalizeError(error);

      SendResponse.ErrorResponse(res, Error.errorData, Error.message);
    }
  };

  public changePassword = async (
    req: Request,
    res: Response,
  ): Promise<Response | void> => {
    try {
      const { email } = req.query;
      const { newPassword, confirmPassword, otp } = req.body;

      if (typeof email !== "string" || !email.trim()) {
        throw new Error("A valid email is required.");
      }

      if (newPassword !== confirmPassword) {
        throw new Error("New password and confirm password do not match.");
      }

      const member = await memberUtils.FIND_Member_BY_EMAIL(email);

      if (!member) {
        throw new Error(AuthConstant.USER_NOT_FOUND);
      }

      const isOtpValid = await otpUtils.verifyOTP(
        email,
        String(otp),
        OTPType.PASSWORD_RESET,
      );

      if (!isOtpValid) {
        throw new Error("Invalid or expired OTP.");
      }

      const hashedPassword = await authUtils.hashPassword(newPassword);

      await authService.UpdateUserPassword(String(member._id), hashedPassword);

      return SendResponse.SuccessResponse(
        res,
        null,
        "Password changed successfully.",
      );
    } catch (error) {
      const Error = normalizeError(error);

      SendResponse.ErrorResponse(res, Error.errorData, Error.message);
    }
  };
}

export default new AuthController();
