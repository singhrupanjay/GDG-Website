import slugify from "slugify";
import { Gallery } from "./Gallery.Schema";
import { IGallery } from "./Gallery.Type";

class GalleryService {
  createNewGallery = async (GalleryProps: IGallery) => {
    try {
      const createGallery = await Gallery.create({
        event: GalleryProps.event,
        slug: slugify(GalleryProps.title),
        title: GalleryProps.title,
        description: GalleryProps.description,
        images: GalleryProps.images,
        tags: GalleryProps.tags,
        uploadedBy: String(GalleryProps.uploadedBy),
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
}

export default new GalleryService();
