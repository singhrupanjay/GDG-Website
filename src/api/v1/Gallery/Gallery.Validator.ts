import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const objectIdSchema = z
  .string()
  .regex(objectIdRegex, "Invalid MongoDB ObjectId");

const ImageSchema = z.object({
  url: z.string().url("Image URL must be a valid URL"),
  publicId: z.string().min(1, "Public ID is required"),
  alt: z.string().min(1, "Alt text is required"),
  caption: z.string().optional(),
  featured: z.boolean().default(false),
});

const GalleryBaseSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be under 100 characters")
    .trim(),

  slug: z.string().min(1, "Slug is required").max(100).trim().toLowerCase(),

  albumImageUrl: z.string().url("Album image URL must be a valid URL"),

  description: z
    .string()
    .max(500, "Description must be under 500 characters")
    .trim()
    .optional()
    .or(z.literal("")), // Allow empty string

  event: objectIdSchema.optional().nullable(),

  tags: z.array(z.string().trim().toLowerCase()).optional(),

  visibility: z.enum(["public", "private"]).default("public"),

  status: z.enum(["draft", "published"]).default("draft"),

  uploadedBy: objectIdSchema.optional(),

  isDeleted: z.boolean().optional().default(false),
});

export const CreateGallerySchema = GalleryBaseSchema.pick({
  title: true,
  slug: true,
  description: true,
  event: true,
  tags: true,
  visibility: true,
  status: true,
  uploadedBy: true,
  albumImageUrl: true, // Added explicitly
}).extend({
  images: z.array(ImageSchema).min(1, "At least one image is required"),
  // Added imageCount as required by IGallery
  imageCount: z.number().int().min(0, "Image count must be a positive integer"),
});

export const UpdateGallerySchema = GalleryBaseSchema.partial().extend({
  images: z.array(ImageSchema).optional(),
  imageCount: z.number().int().min(0).optional(),

  title: GalleryBaseSchema.shape.title.optional(),
  slug: GalleryBaseSchema.shape.slug.optional(),
  description: GalleryBaseSchema.shape.description.optional(),
  event: GalleryBaseSchema.shape.event.optional(),
  tags: GalleryBaseSchema.shape.tags.optional(),
  visibility: GalleryBaseSchema.shape.visibility.optional(),
  status: GalleryBaseSchema.shape.status.optional(),
  albumImageUrl: z.string().url().optional(),
});

// --- Add Image Schema ---
export const AddImageToGallerySchema = z.object({
  galleryId: objectIdSchema,
  image: ImageSchema, // Changed from imageUrl to full image object
});

// --- Remove Image Schema ---
export const RemoveImageFromGallerySchema = z.object({
  galleryId: objectIdSchema,
  publicId: z.string().min(1, "Image Public ID is required"), // Use publicId for safe deletion
});
