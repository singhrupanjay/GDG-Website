import crypto from "crypto";
import { OTP } from "./OTP.Schema";
import { OTPType } from "./Otp.Type";

class OtpUtils {
  generateOTP = (length: number): Promise<string> => {
    const digits = crypto
      .randomInt(0, 10 ** length)
      .toString()
      .padStart(length, "0");
    return Promise.resolve(digits);
  };

  verifyOTP = async (email: string, otp: string, otpType: OTPType) => {
    console.log("Verifying OTP for email:", email, "OTP:", otp, "Type:", otpType);
    const isValid = await OTP.findOne({
      email: email,
      otp: otp,
      type: otpType,
    
    });
    console.log("OTP verification result:-->", isValid);
    return isValid;
  };
}

export const otpUtils = new OtpUtils();
