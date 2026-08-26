import { Schema, model, Types } from "mongoose";
import { IGallery } from "./Gallery.Type";

const GallerySchema = new Schema<IGallery>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    albumImageUrl: {
      type: String,
      trim: true,
    },

    imageCount: {
      type: Number,
      default: 0,
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
      trim: true,
      maxlength: 500,
    },

    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },

    images: [
      {
        url: {
          type: String,
          unique: true,
          required: true,
        },
      },
    ],

    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],

    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

GallerySchema.index({ status: 1 });
GallerySchema.index({ event: 1 });
GallerySchema.index({ tags: 1 });
GallerySchema.index({ uploadedBy: 1 });

export const Gallery = model<IGallery>("Gallery", GallerySchema);
