import { Gallery } from "./Gallery.Schema";

class GalleryUtils {
  FIND_Gallery_By_Slug = async (Slug: string) => {
    return Gallery.findOne({
      slug: Slug,
      visibility: "public",
      status: "published",
    });
  };
}

export default new GalleryUtils();
