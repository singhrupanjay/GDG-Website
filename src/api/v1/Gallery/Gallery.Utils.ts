import { Gallery } from "./Gallery.Schema";

class GalleryUtils {
  FIND_Gallery_By_Slug = async (Slug: string) => {
    return await Gallery.findOne({
      slug: Slug,
      visibility: "public",
      status: "published",
      "images.featured": true,
    });
  };

  FIND_ALL_GALLERY = async (page: number, limit: number) => {
    const skip = (page - 1) * limit;

    // {
    //   visibility: "public",
    //   status: "published",
    // }

    const albums = await Gallery.find()
      .select("-images -tags")
      .populate("event", "title registrationStartAt registrationEndAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return albums;
  };

  FIND_GALLERY_BY_NAME = async (galleryName: string) => {
    return await Gallery.findOne({
      title: galleryName,
    });
  };
}

export default new GalleryUtils();
