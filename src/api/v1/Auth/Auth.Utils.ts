import { AuthModel } from "./Auth.model";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import path from "path";
import fs from "fs";
import { env_Constant } from "../../../constant/env.constant";
import { OtpTemplateType } from "./Auth.type";

class AuthUtils {
  public async FIND_USER_BY_EMAIL(email: string) {
    return AuthModel.findOne({ email: email });
  }
  public async getUserById(userId: string) {
    return await AuthModel.findById(userId);
  }

  public async failedLoginAttempts(userId: string): Promise<number> {
    const user = await AuthModel.findById(userId);
    if (!user) {
      throw new Error("Failed to find user");
    }

    user.failedLoginAttempts += 1;
    await user.updateOne({ failedLoginAttempts: user.failedLoginAttempts });
    return user?.failedLoginAttempts;
  }

  public async resetFailedLoginAttempts(userId: string) {
    const user = await AuthModel.findById(userId);
    if (user) {
      user.failedLoginAttempts = 0;
      await user.updateOne({ failedLoginAttempts: user.failedLoginAttempts });
    }
  }

  public async banUser(userId: string) {
    const user = await AuthModel.findById(userId);
    if (user) {
      user.isBanned = true;
      await user.updateOne({ isBanned: user.isBanned });
    }
  }

  public async unbanUser(userId: string) {
    const user = await AuthModel.findById(userId);
    if (user) {
      user.isBanned = false;
      await user.updateOne({ isBanned: user.isBanned });
    }
  }

  public generateAuthTokens = async (data: {
    _id: string;
    email: string;
    role: string;
    ip: string | undefined;
  }): Promise<{ accessToken: string; refreshToken: string }> => {
    const accessToken = await jwt.sign(
      { data },
      env_Constant.JWT_ACCESS_SECRET,
      {
        expiresIn: "15m",
      },
    );

    const refreshToken = await jwt.sign(
      { _id: data._id },
      env_Constant.JWT_REFRESH_SECRET,
      { expiresIn: "7d" },
    );

    return { accessToken, refreshToken };
  };

  public getOtpTemplate = (otpProps: OtpTemplateType) => {
    // src/api/v1/Auth/Template/universal-otp.html
    let OtpFilePath = path.join(__dirname, "Template/universal-otp.html");
    let OtpTemplate = fs.readFileSync(OtpFilePath, "utf-8");

    let TemplateData = {
      "{{purpose}}": otpProps.purpose,
      "{{actionText}}": otpProps.actionText,
      "{{fullName}}": otpProps.fullName,
      "{{otp}}": otpProps.otp,
    };

    for (const key in TemplateData) {
      OtpTemplate = OtpTemplate.replace(
        new RegExp(key, "g"),
        TemplateData[key as keyof typeof TemplateData],
      );
    }

    return OtpTemplate;
  };

  public async verifyAccessToken(token: string) {
    try {
      const decoded = jwt.verify(token, env_Constant.JWT_ACCESS_SECRET);
      return decoded;
    } catch (error) {
      throw new Error("Invalid access token");
    }
  }

  public async verifyRefreshToken(token: string) {
    try {
      const decoded = jwt.verify(token, env_Constant.JWT_REFRESH_SECRET);
      return decoded;
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  }

  public async refreshMyAccess(oldRefreshToken: string, ip: string) {
    const decoded = jwt.verify(
      oldRefreshToken,
      env_Constant.JWT_REFRESH_SECRET,
    );

    if (typeof decoded === "string" || !decoded._id) {
      throw new Error("Invalid refresh token");
    }

    const user = await AuthModel.findById(String(decoded._id));

    if (!user || user.isBanned) throw new Error("Stay logged out!");

    return this.generateAuthTokens({
      _id: String(user._id),
      email: user.email,
      role: user.role,
      ip: ip,
    });
  }

  public async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  public async deleteUserById(userId: string): Promise<void> {
    await AuthModel.findByIdAndDelete(userId);
  }

  public async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await argon2.verify(hashPassword, password);
  }
}

export const authUtils = new AuthUtils();
