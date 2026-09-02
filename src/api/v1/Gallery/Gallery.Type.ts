import { Types } from "mongoose";
import z from "zod";
import {
  AddImageToGallerySchema,
  RemoveImageFromGallerySchema,
  UpdateGallerySchema,
} from "./Gallery.Validator";

export interface ImageData {
  url: string;
  publicId: string;
  caption: string;
  featured: boolean;
}

export interface IGallery {
  title: string;
  slug?: string;
  description?: string;

  imageCount: number;

  albumImageUrl: string;

  event: string;

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

  uploadedBy?: string;

  isDeleted?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export type UateGpdalleryProps = z.infer<typeof UpdateGallerySchema>;
export type AddImageProps = z.infer<typeof AddImageToGallerySchema>;
export type RemoveImageProps = z.infer<typeof RemoveImageFromGallerySchema>;
