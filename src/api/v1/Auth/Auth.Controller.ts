import { Request, Response } from "express";
import { permissionService } from "../Permission/Permission.service";

import crypto from "crypto";
import { Default_Organization_Permissions } from "../Permission/Permission.constant";
import { communityService } from "../Community/Community.Service";
import { authService } from "./Auth.Service";
import { authUtils } from "./Auth.Utils";
import { AuthConstant, ROLE_CONSTANT } from "./Auth.Constant";
import SendResponse from "../../../utils/SendResponse";
import { memberService } from "../Member/Member.Service";
import slugify from "slugify";
import { memberUtils } from "../Member/Member.Utils";

import { cloudinaryUtils } from "../../../utils/Cloudinary.utils";
import { env_Constant } from "../../../constant/env.constant";
import AuthChannel from "./Auth.Channel.";
import { otpUtils } from "../OTP/OTP.Utils";
import { otpService } from "../OTP/OTP.Service";
import { OTPType } from "../OTP/Otp.Type";

class AuthController {
  private async setAuthCookiesAndHeaders(
    res: Response,
    tokens: { accessToken: string; refreshToken: string },
  ) {
    console.log("Setting auth cookies and headers with tokens:", tokens);
    const isProd = env_Constant.NODE_ENV === "production";

    const commonOptions = {
      httpOnly: true,
      secure: isProd,
      sameSite: "strict" as const,
    };

    // 1. Set Access Token (Short-lived)
    res.cookie("accessToken", tokens.accessToken, {
      ...commonOptions,
      maxAge: 15 * 60 * 1000, // 15 mins
    });

    // 2. Set Refresh Token (Long-lived)
    // Optimization: Only send this cookie when the user hits the /refresh route
    res.cookie("refreshToken", tokens.refreshToken, {
      ...commonOptions,
      path: "/api/auth/refresh", // Browser only sends it to this specific URL
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }

  public CommunitySignUp = async (req: Request, res: Response) => {
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

      let findUserByEmail = await authUtils.FIND_USER_BY_EMAIL(OfficialEmail);

      if (findUserByEmail) {
        throw new Error(AuthConstant.USER_ALREADY_EXISTS);
      }

      let { path } = req.file || {};

      // If no uploaded file is provided (e.g., in tests), fall back to provided LogoUrl
      // or a safe default image instead of throwing an error.
      let cloudinary;
      if (path) {
        cloudinary = await cloudinaryUtils.uploadImage(String(path));
      } else {
        cloudinary = {
          secure_url: LogoUrl || "https://via.placeholder.com/150",
        };
      }

      let Auth = await authService.createUser({
        email: OfficialEmail,
        passwordHash: password,
        failedLoginAttempts: 0,
        isBanned: false,
        role: ROLE_CONSTANT.ORGANIZATION,
        emailVerified: false,
      });

      let CreateNewCommunity = await communityService.createNewCommunity({
        OwnerID: String(Auth._id),
        CommunityName,
        Slug: slugify(CommunityName + "-" + crypto.randomUUID(), {
          lower: true,
          strict: true,
          trim: true,
        }),
        Bio,
        City,
        ContactPhone,
        Members: [],
        Country,
        LogoUrl: cloudinary.secure_url,
        OfficialEmail,
        Website,
        Status: "pending",
        SocialLinks: socialLinks,
      });

      await permissionService.assignOrganizationPermissions(String(Auth._id));

      SendResponse.SuccessResponse(
        res,
        CreateNewCommunity,
        AuthConstant.COMMUNITY_ACCOUNT_CREATED,
      );
    } catch (error: unknown) {
      console.log(error);
      let message = "An error occurred";
      let errorData = error;
      if (error && typeof error === "object" && "issues" in error) {
        // Zod validation error
        message = "Validation failed";
        errorData = (error as any).issues || error;
      } else if (error instanceof Error) {
        message = error.message;
        errorData = error;
      } else {
        message = String(error);
      }
      SendResponse.ErrorResponse(res, errorData, message);
    }
  };

  public LoginUser = async (req: Request, res: Response) => {
    try {
      let { email, password } = req.body;

      let FindUser = await authUtils.FIND_USER_BY_EMAIL(email);

      if (!FindUser) {
        throw new Error(AuthConstant.USER_NOT_FOUND);
      }

      console.log("User found:", FindUser);

      let comparePass = await authUtils.comparePassword(
        password,
        FindUser.passwordHash,
      );

      console.log("Password comparison result:", comparePass);

      if (!comparePass) {
        let failedLoginAttempts: number = await authUtils.failedLoginAttempts(
          String(FindUser._id),
        );

        if (failedLoginAttempts >= 5) {
          await authUtils.banUser(String(FindUser._id));

          // Queue account banned email
          const unbannedAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now
          // await EmailPublisher.sendAccountBannedEmail({
          //   email: FindUser.email,
          //   unbannedAt,
          // });
        } else {
          const attemptsLeft = 5 - failedLoginAttempts;
          throw new Error(
            `Invalid password. You have ${attemptsLeft} more attempt(s) before your account is temporarily banned for 30 min.`,
          );
        }
      }

      const perms = await permissionService.getPermissionsForUser(
        String(FindUser._id),
      );

      console.log("User permissions:--->", perms);

      (req as Request & { userId?: string }).userId = String(FindUser._id);

      // 6. Generate token and set it in cookie and header (assuming this happens inside SendResponse.SuccessResponse or elsewhere)

      let { accessToken, refreshToken } = await authUtils.generateAuthTokens({
        _id: String(FindUser._id),
        email: FindUser.email,
        role: FindUser.role,
        ip: req.ip,
      });

      await this.setAuthCookiesAndHeaders(res, { accessToken, refreshToken });

      SendResponse.SuccessResponse(
        res,
        {
          FindUser,
          perms,
        },
        AuthConstant.LOGIN_SUCCESS,
      );
    } catch (error: any) {
      SendResponse.ErrorResponse(res, error, error.message);
    }
  };

  public ForgotPassword = async (req: Request, res: Response) => {
    let email: string = req.body.email;

    console.log("email ---> ", email);

    try {
      let AuthUser = await memberUtils.FIND_Member_BY_EMAIL(email);

      console.log("AuthUser found for password reset:", AuthUser);

      if (!AuthUser) {
        throw new Error(AuthConstant.USER_NOT_FOUND);
      }

      const generatedOtp = await otpUtils.generateOTP(6); // Generate a 6-digit OTP

      await otpService.createAndUpdateOtp(
        email,
        OTPType.PASSWORD_RESET,
        generatedOtp,
      );

      // Send OTP email via RabbitMQ

      await AuthChannel.sendOtp({
        purpose: "password_reset", // Updated purpose
        actionText: `
       We received a request to reset your password for GDG Ranchi.
       Please use the secure 6-digit verification code provided in your account details box to verify
       your identity and set up a new password. For your security, this code will expire shortly. 
       If you did not request this change, you can safely ignore this email—your account remains
        completely secure and no changes will be made.
      `,
        fullName: AuthUser.firstName + " " + AuthUser.lastName,
        email: email,
        otp: generatedOtp,
      });

      SendResponse.SuccessResponse(res, null, "Password reset email sent.");
    } catch (error: any) {
      SendResponse.ErrorResponse(res, error, error.message);
    }
  };

  public changePassword = async (req: Request, res: Response) => {
    let { email } = req.query;
    let { newPassword, confirmPassword, otp } = req.body;

    try {
      let AuthUser = await memberUtils.FIND_Member_BY_EMAIL(String(email));

      if (!AuthUser) {
        throw new Error(AuthConstant.USER_NOT_FOUND);
      }

      if (newPassword !== confirmPassword) {
        throw new Error("New password and confirm password do not match.");
      }

      // Validate the OTP for password reset using zod

      let isOtpValid = await otpUtils.verifyOTP(
        String(email),
        String(otp),
        OTPType.PASSWORD_RESET,
      );

      console.log("OTP validation result:", isOtpValid);

      if (!isOtpValid) {
        throw new Error("Invalid or expired OTP.");
      }

      // delte otp if more that 5 attempts are made

      let hashedPassword = await authUtils.hashPassword(newPassword);

      let updatePassword = await authService.UpdateUserPassword(
        String(AuthUser._id),
        hashedPassword,
      );

      SendResponse.SuccessResponse(
        res,
        isOtpValid,
        "Password changed successfully.",
      );
    } catch (error: any) {
      SendResponse.ErrorResponse(res, error, error.message);
    }
  };
}

export default new AuthController();
