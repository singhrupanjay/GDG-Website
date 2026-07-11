import mongoose, { Model, Schema } from "mongoose";
import { IOTP, OTPType } from "./Otp.Type";

const otpSchema = new Schema<IOTP>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    otp: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: Object.values(OTPType),
      required: true,
      index: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    attempts: {
      type: Number,
      default: 0,
      min: 0,
    },

    expiresAt: {
      type: Date,
      required: true,
      expires: 0, // Auto delete when expiresAt is reached
    },
  },
  {
    timestamps: true,
  },
);

// Only one active OTP per email + type
otpSchema.index(
  {
    email: 1,
    type: 1,
  },
  {
    unique: true,
  },
);

export const OTP: Model<IOTP> =
  mongoose.models.OTP || mongoose.model<IOTP>("OTP", otpSchema);
