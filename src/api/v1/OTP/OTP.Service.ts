import { OTP } from "./OTP.Schema";
import { OTPType } from "./Otp.Type";
import { otpUtils } from "./OTP.Utils";

class OtpService {
  createAndUpdateOtp = async (
    email: string,
    type: OTPType,
    otp: string,
  ): Promise<void> => {
    return await OTP.findOneAndUpdate(
      {
        email,
        type,
      },
      {
        $set: {
          otp,
          verified: false,
          attempts: 0,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min
        },
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );
  };
}

export const otpService = new OtpService();
