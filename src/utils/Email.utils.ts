import nodemailer from "nodemailer";
import { env_Constant } from "../constant/env.constant";

export type EmailPayload = {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  attachments?: any[];
};

class EmailUtils {
  public transporter = () => {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: env_Constant.SMTP_USER || "",
        pass: env_Constant.SMTP_PASS || "",
      },
    });
  };
}

export default new EmailUtils();
