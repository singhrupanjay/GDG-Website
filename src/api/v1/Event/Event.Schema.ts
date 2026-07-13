import { Schema, Types, model } from "mongoose";
import { EventStatus, EventVisibility, RewardType } from "./event.type";

import { TimelineSchema } from "../Timeline/Timeline..Schema";
import { VenueSchema } from "../Venue/Venue.Schema";
import { TicketSchema } from "../Ticket/Ticket.Schema";
import { PrizeSchema } from "../Prize/Prize.Schema";

const EventSchema = new Schema(
  {
    /* -------------------------------------------------------------------------- */
    /*                             SYSTEM INFORMATION                              */
    /* -------------------------------------------------------------------------- */

    Slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    communityId: {
      type: Types.ObjectId,
      ref: "Community",
      required: true,
      index: true,
    },

    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    updatedBy: {
      type: Types.ObjectId,
      ref: "User",
    },

    /* -------------------------------------------------------------------------- */
    /*                               BASIC INFORMATION                             */
    /* -------------------------------------------------------------------------- */

    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 150,
      index: "text",
    },

    shortDescription: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    descriptionMarkdown: {
      type: String,
      required: true,
    },

    redirectUrl: {
      type: String,
      default: "",
    },

    tags: {
      type: [String],
      default: [],
      index: true,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    visibility: {
      type: String,
      enum: Object.values(EventVisibility),
      default: EventVisibility.PUBLIC,
      index: true,
    },

    status: {
      type: String,
      enum: Object.values(EventStatus),
      default: EventStatus.REGISTRATION_OPEN,
      index: true,
    },

    /* -------------------------------------------------------------------------- */
    /*                                    MEDIA                                   */
    /* -------------------------------------------------------------------------- */

    coverImageUrl: {
      type: String,
      default: "",
    },

    introVideoUrl: {
      type: String,
      default: "",
    },

    /* -------------------------------------------------------------------------- */
    /*                                  SCHEDULE                                  */
    /* -------------------------------------------------------------------------- */

    registrationStartAt: {
      type: Date,
      index: true,
    },

    registrationEndAt: {
      type: Date,
      index: true,
    },

    /* -------------------------------------------------------------------------- */
    /*                                    VENUE                                   */
    /* -------------------------------------------------------------------------- */

    venue: {
      type: VenueSchema,
      required: true,
    },

    mentors: {
      type: [Types.ObjectId],
      ref: "Member",
      default: [],
    },

    judges: {
      type: [Types.ObjectId],
      ref: "Member",
      default: [],
    },

    /* -------------------------------------------------------------------------- */
    /*                             PARTNERS & SPONSORS                            */
    /* -------------------------------------------------------------------------- */

    partners: {
      type: [Types.ObjectId],
      ref: "Partner",
      default: [],
    },

    sponsors: {
      type: [Types.ObjectId],
      ref: "Partner",
      default: [],
    },

    /* -------------------------------------------------------------------------- */
    /*                               REGISTRATION                                 */
    /* -------------------------------------------------------------------------- */

    tickets: {
      type: [TicketSchema],
      default: [],
    },

    /* -------------------------------------------------------------------------- */
    /*                               EVENT CONTENT                                */
    /* -------------------------------------------------------------------------- */

    timeline: {
      type: [TimelineSchema],
      default: [],
    },

    rules: {
      type: [String],
      default: [],
    },

    requirements: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const EventModel = model("Event", EventSchema);
