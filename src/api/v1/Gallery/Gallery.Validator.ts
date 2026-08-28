import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const objectIdSchema = z
  .string()
  .regex(objectIdRegex, "Invalid MongoDB ObjectId");

const ImageSchema = z.object({
  url: z.string().url("Image URL must be a valid URL"),
  publicId: z.string().min(1, "Public ID is required"),
  caption: z.string().min(1, "Caption is required"),
  featured: z.boolean().default(false),
});

export const CreateGallerySchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be under 100 characters")
    .trim(),

  slug: z.string().min(1, "Slug is required").max(100).trim(),

  albumImageUrl: z.string().url("Album image URL must be a valid URL"),
  description: z
    .string()
    .max(500, "Description must be under 500 characters")
    .trim(),

  event_Id: objectIdSchema,

  tags: z.array(z.string().trim()),

  visibility: z.enum(["public", "private"]).default("public"),
  imageCount: z.number().default(0).optional(),

  status: z.enum(["draft", "published"]).default("draft"),

  uploadedBy: objectIdSchema,
  isDeleted: z.boolean().default(false),
});

export const UpdateGallerySchema = CreateGallerySchema.partial().extend({
  images: z.array(ImageSchema).optional(),
  imageCount: z.number().int().min(0).optional(),
  // Explicitly allow partial updates for required fields if needed
  title: z.string().optional(),
  slug: z.string().optional(),
  uploadedBy: objectIdSchema.optional(),
  albumImageUrl: z.string().url().optional(),
});

export const AddImageToGallerySchema = z.object({
  galleryId: objectIdSchema,
  image: ImageSchema,
});

export const RemoveImageFromGallerySchema = z.object({
  galleryId: objectIdSchema,
  publicId: z.string().min(1, "Image Public ID is required"),
});
