import { Schema, Types, model } from "mongoose";

export enum PartnerRelationshipType {
  SPONSOR = "Sponsor",
  PARTNER = "Partner",
}

export enum PartnerTier {
  TITLE = "Title",
  PLATINUM = "Platinum",
  GOLD = "Gold",
  SILVER = "Silver",
  BRONZE = "Bronze",
  COMMUNITY = "Community",
  KNOWLEDGE = "Knowledge",
  MEDIA = "Media",
  HIRING = "Hiring",
  VENUE = "Venue",
  STARTUP = "Startup",
  ECOSYSTEM = "Ecosystem",
  OTHER = "Other",
}

export enum PartnerStatus {
  PENDING = "Pending",
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  REJECTED = "Rejected",
  COMPLETED = "Completed",
}

const PartnerSchema = new Schema(
  {
    organizationId: {
      type: Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },

    /* ------------------------------------------------------------------ */
    /* Basic Information                                                   */
    /* ------------------------------------------------------------------ */

    companyName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    shortName: {
      type: String,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      default: "",
    },

    companyLogo: {
      type: String,
      required: true,
    },

    bannerImage: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    industry: {
      type: String,
      default: "",
    },

    companySize: {
      type: String,
      default: "",
    },

    foundedYear: Number,

    /* ------------------------------------------------------------------ */
    /* Classification                                                     */
    /* ------------------------------------------------------------------ */

    relationshipType: {
      type: String,
      enum: Object.values(PartnerRelationshipType),
      required: true,
      index: true,
    },

    tier: {
      type: String,
      enum: Object.values(PartnerTier),
      default: PartnerTier.OTHER,
      index: true,
    },

    status: {
      type: String,
      enum: Object.values(PartnerStatus),
      default: PartnerStatus.PENDING,
      index: true,
    },

    /* ------------------------------------------------------------------ */
    /* Contact Person                                                     */
    /* ------------------------------------------------------------------ */

    contact: {
      name: String,
      designation: String,
      email: String,
      phone: String,
    },

    /* ------------------------------------------------------------------ */
    /* Social Links                                                       */
    /* ------------------------------------------------------------------ */

    socialLinks: {
      linkedin: String,
      twitter: String,
      github: String,
      youtube: String,
      instagram: String,
      facebook: String,
    },

    /* ------------------------------------------------------------------ */
    /* Sponsorship Details                                                */
    /* ------------------------------------------------------------------ */

    sponsorship: {
      amount: {
        type: Number,
        default: 0,
      },

      currency: {
        type: String,
        default: "INR",
      },

      benefits: {
        type: [String],
        default: [],
      },

      deliverables: {
        type: [String],
        default: [],
      },

      contractSigned: {
        type: Boolean,
        default: false,
      },
    },

    /* ------------------------------------------------------------------ */
    /* Event Mapping                                                      */
    /* ------------------------------------------------------------------ */

    events: [
      {
        type: Types.ObjectId,
        ref: "Event",
      },
    ],

    /* ------------------------------------------------------------------ */
    /* Analytics                                                          */
    /* ------------------------------------------------------------------ */

    analytics: {
      sponsoredEvents: {
        type: Number,
        default: 0,
      },

      totalContribution: {
        type: Number,
        default: 0,
      },
    },

    /* ------------------------------------------------------------------ */
    /* Internal                                                           */
    /* ------------------------------------------------------------------ */

    notes: {
      type: String,
      default: "",
    },

    createdBy: {
      type: Types.ObjectId,
      ref: "Member",
      required: true,
    },

    updatedBy: {
      type: Types.ObjectId,
      ref: "Member",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/* ----------------------------- Indexes ----------------------------- */

PartnerSchema.index({
  organizationId: 1,
  companyName: 1,
});

PartnerSchema.index({
  relationshipType: 1,
  tier: 1,
});

PartnerSchema.index({
  status: 1,
});

PartnerSchema.index({
  organizationId: 1,
  relationshipType: 1,
});

PartnerSchema.index({
  companyName: "text",
  description: "text",
});

export const PartnerModel = model("Partner", PartnerSchema);