import mongoose, { Schema, Document } from "mongoose";
import { IEventRegistration } from "./EventRegistration.Type";

const EventRegistrationSchema: Schema = new Schema(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    registrationType: {
      type: String,
      enum: ["SOLO", "TEAM"],
      required: true,
      uppercase: true,
    },
    teamName: {
      type: String,
      trim: true,
      index: true,
      // Sparse allow unique validation checking on optional string values
      sparse: true,
      maxlength: 50,
    },
    teamCode: {
      type: String,
      unique: true,
      index: true,
      sparse: true,
      trim: true,
    },
    teamLeaderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        memberId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rsvpId: {
          type: String,
          default: null,
        },
        isRSVP: {
          type: Boolean,
          default: false,
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    maxTeamSize: {
      type: Number,
      default: 4,
    },
    isSubmissionFinalized: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const EventRegistration = mongoose.model<IEventRegistration>(
  "EventRegistration",
  EventRegistrationSchema,
);
