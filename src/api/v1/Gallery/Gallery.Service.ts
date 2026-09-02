import slugify from "slugify";
import { Gallery } from "./Gallery.Schema";
import { IGallery } from "./Gallery.Type";

class GalleryService {
  createNewGallery = async (GalleryProps: IGallery) => {
    try {
      const createGallery = await Gallery.create({
        event: GalleryProps.event,
        slug: GalleryProps.title,
        title: GalleryProps.title,
        description: GalleryProps.description,
        images: GalleryProps.images,
        tags: GalleryProps.tags,
        uploadedBy: GalleryProps.uploadedBy,
        albumImageUrl: GalleryProps.albumImageUrl,
        status: GalleryProps.status,
        visibility: GalleryProps.visibility,
      });

      return createGallery;
    } catch (error: any) {
      const errorMessage = error.message || String(error);
      throw new Error(errorMessage);
    }
  };

  async deleteImageFromGallery(
    galleryId: string,
    imageUrl: string,
    userId: string,
  ) {
    try {
      const gallery = await Gallery.findOne({
        _id: galleryId,
        uploadedBy: userId,
      });

      if (!gallery) {
        throw new Error("Gallery not found or unauthorized access");
      }

      const imageExists = gallery.images.some(
        (img: any) => img.url === imageUrl,
      );

      if (!imageExists) {
        throw new Error("Image not found in this gallery");
      }

      // 4. Perform the optimized deletion in one DB operation
      const updatedGallery = await Gallery.findOneAndUpdate(
        { _id: galleryId, "images.url": imageUrl }, // Filter by ID AND image existence
        {
          $pull: { images: { url: imageUrl } }, // Remove image from array
        },
        { new: true, runValidators: true }, // Return updated document
      );

      if (!updatedGallery) {
        throw new Error(
          "Failed to delete image (image may have been removed concurrently)",
        );
      }

      return updatedGallery;
    } catch (error: any) {
      console.error("Error deleting image:", error);
      throw new Error(error.message || "Failed to delete image");
    }
  }

  async addImageToGallery(
    galleryId: string,
    userId: string,
    imageDetails: {
      url: string;
      publicId?: string;
      caption: string;
      featured: boolean;
    },
  ) {
    try {
    

      
      const updatedGallery = await Gallery.findOneAndUpdate(
        { _id: galleryId }, // Filter by ID
        {
          $push: {
            images: {
              url: imageDetails.url,
              publicId: imageDetails.publicId,
              caption: imageDetails.caption,
              featured: imageDetails.featured,
            },
          },
        },
        { new: true, runValidators: true }, // Return updated doc
      );

      if (!updatedGallery) {
        throw new Error("Failed to add image to gallery");
      }

      return updatedGallery;
    } catch (error: any) {
      console.error("Error adding image:", error);
      throw new Error(error.message || "Failed to add image to gallery");
    }
  }
}

export default new GalleryService();
