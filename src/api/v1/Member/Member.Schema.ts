import mongoose from "mongoose";
import { MemberType } from "./Member.type";
import { ROLE_CONSTANT } from "../Auth/Auth.Constant";
import { Roles } from "./Role.constant";

const MemberSchema = new mongoose.Schema<MemberType>(
  {
    Slug: {
      type: String,
      unique: true,
      sparse: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },



    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    Bio: {
      type: String,
      required: true,
    },

    membershipStatus: {
      type: String,
      enum: ["On Boarding", "inactive", "Active", "Suspended", "Banned"],
      default: "On Boarding",
    },

    onboardingSource: {
      type: String,
      enum: [
        "website",
        "referral",
        "social_media",
        "event",
        "direct_invitation",
        "other",
      ],
      default: "website",
    },

    AuthId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
      index: true,
    },

    primaryRole: {
      type: String,
      enum: Roles,
      default: ROLE_CONSTANT.PARTICIPANT,
    },

    location: {
      city: {
        type: String,
        default: "",
      },
      state: {
        type: String,
        default: "",
      },
      country: {
        type: String,
        default: "",
      },
      pinCode: {
        type: String,
        default: "",
      },
    },

    skills: [
      {
        type: String,
      },
    ],

    socialLinks: {
      linkedin: {
        type: String,
        default: "",
      },
      github: {
        type: String,
        default: "",
      },
      twitter: {
        type: String,
        default: "",
      },
      website: {
        type: String,
        default: "",
      },
      instagram: {
        type: String,
        default: "",
      },
      youtube: {
        type: String,
        default: "",
      },
      portfolio: {
        type: String,
        default: "",
      },
      medium: {
        type: String,
        default: "",
      },
    },

    areaOfInterest: [
      {
        type: String,
      },
    ],

    internalNotes: String,
  },
  {
    timestamps: true,
  },
);

export const MemberModel = mongoose.model<MemberType>("Member", MemberSchema);
