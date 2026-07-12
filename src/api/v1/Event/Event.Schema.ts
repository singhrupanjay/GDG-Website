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

    eventType: {
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
      default: EventStatus.DRAFT,
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

    /* -------------------------------------------------------------------------- */
    /*                                   SETTINGS                                 */
    /* -------------------------------------------------------------------------- */

    settings: {
      publicVisible: {
        type: Boolean,
        default: true,
      },

      featuredEvent: {
        type: Boolean,
        default: false,
      },

 


      allowCancellation: {
        type: Boolean,
        default: true,
      },

      showRemainingSeats: {
        type: Boolean,
        default: true,
      },
    },

 
   
  },
  {
    timestamps: true,
    versionKey: false,
  },
);



export const EventModel = model("Event", EventSchema);
