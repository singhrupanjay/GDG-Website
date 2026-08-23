import { Types } from "mongoose";
import z from "zod";
import {
  AddImageToGallerySchema,
  CreateGallerySchema,
  RemoveImageFromGallerySchema,
  UpdateGallerySchema,
} from "./Gallery.Validator";

export interface IGallery {
  title: string;
  slug?: string;
  description?: string;

  imageCount: number;

  albumImageUrl: string;

  event: Types.ObjectId;

  images: {
    url: string;
    publicId: string;
    alt: string;
    caption?: string;
    featured: boolean;
  }[];

  tags: string[];

  visibility: "public" | "private";

  status: "draft" | "published";

  uploadedBy: Types.ObjectId;

  isDeleted: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export type UateGpdalleryProps = z.infer<typeof UpdateGallerySchema>;
export type AddImageProps = z.infer<typeof AddImageToGallerySchema>;
export type RemoveImageProps = z.infer<typeof RemoveImageFromGallerySchema>;
