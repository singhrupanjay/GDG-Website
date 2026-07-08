import { Schema, Types } from "mongoose";

export const GeoLocationSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["Point"], // GeoJSON Point is the standard for specific coordinates
      required: true,
      default: "Point",
    },
    coordinates: {
      type: [Number], // Expecting [longitude, latitude]
      required: true,
    },
  },
  { _id: false },
);

GeoLocationSchema.path("coordinates").validate((val: number[]) => {
  return val.length === 2; // Must be [longitude, latitude]
}, "Coordinates must be a [longitude, latitude] array");

export const VenueSchema = new Schema(
  {
    mode: {
      type: String,

      required: [true, "Event mode is required"],
    },

    venueName: {
      type: String,
      required: [true, "Venue name is required"],
      trim: true,
      maxlength: [120, "Venue name cannot exceed 120 characters"],
    },

    address: {
      type: String,
      trim: true,
      maxlength: [500, "Address cannot exceed 500 characters"],
    },

    city: {
      type: String,
      trim: true,
    },

    state: {
      type: String,
      trim: true,
    },

    country: {
      type: String,
      trim: true,
      default: "India",
    },

    postalCode: {
      type: String,
      trim: true,
    },

    geo: {
      type: GeoLocationSchema,
      index: "2dsphere",
    },

    meetingUrl: {
      type: String,
      trim: true,
      validate: {
        validator: (v: string) =>
          /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
            v,
          ),
        message: "Please enter a valid meeting URL",
      },
    },

    mapUrl: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
    timestamps: false, // Venues as sub-documents usually don't need timestamps
  },
);
