export enum OTPType {
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
  PASSWORD_RESET = "PASSWORD_RESET",
  LOGIN = "LOGIN",
  RSVP = "RSVP",
  INVITE = "INVITE",
}

export interface IOTP {
  email: string;
  otp: string;
  type: OTPType;
  verified: boolean;
  attempts: number;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
