import { Request, Response } from "express";
import crypto from "crypto";
import slugify from "slugify";
import GalleryUtils from "./Gallery.Utils";
import normalizeError from "../../../utils/normalizeError";
import SendResponse from "../../../utils/SendResponse";

import { permissionService } from "../Permission/Permission.service";
import { Gallery_Permissions } from "../Permission/Permission.constant";
import GalleryService from "./Gallery.Service";
import { IGallery } from "./Gallery.Type";
import { eventUtils } from "../Event/Event.Utils";
import { CreateGallerySchema } from "./Gallery.Validator";
import { memberUtils } from "../Member/Member.Utils";

class GalleryController {
  FIND_SINGLE_GALLERY = (req: Request, res: Response) => {
    try {
      let { Slug } = req.params;

      if (!Slug) {
        throw new Error("Please Provide Slug");
      }

      let findGallery = GalleryUtils.FIND_Gallery_By_Slug(String(Slug));

      if (!findGallery) {
        throw new Error("Failed to Find Event Gallery");
      }

      SendResponse.SuccessResponse(res, findGallery, "Fetch Gallery By Slug");
    } catch (error: any) {
      SendResponse.ErrorResponse(res, error, error.message);
    }
  };

  Create_New_Gallery = async (req: Request, res: Response) => {
    try {
      let userId = (req as Request & { userId?: string }).userId;

      if (!userId) {
        throw new Error("User ID not found in request");
      }

      let checkPermissions = await permissionService.check_UserPermission(
        String(userId),
        Gallery_Permissions.CREATE_GALLERY,
      );

      console.log("User Id ---> ", userId, checkPermissions);

      if (!checkPermissions) {
        throw new Error(
          "Forbidden: You don't have permission to create gallery",
        );
      }

      let findMember = await memberUtils.FIND_Member_ID_By_UserId(
        String(userId),
      );
      if (!findMember) {
        throw new Error(
          "Forbidden: You can't Create the Gallery Becouse this Feature is only for Member",
        );
      }

      let { success, data, error } = await CreateGallerySchema.safeParseAsync({
        ...req.body,

        slug: slugify(req.body.title + crypto.randomBytes(4).toString("hex"), {
          lower: true,
          trim: true,
          strict: true,
          locale: "en",
        }),

        uploadedBy: String(findMember._id),
      });

      if (!success) {
        throw new Error(JSON.stringify(error));
      }

      if (!data) {
        throw new Error("Gallery data is missing");
      }

      let findEventBYName = await eventUtils.FIND_EVENT_BY_NAME(
        req.body.EventName,
      );

      if (!findEventBYName) {
        throw new Error("Failed to Find Event By EventName");
      }

      let createGallery = await GalleryService.createNewGallery({
        slug: data.slug,
        title: data.title,
        description: data.description,
        event: String(findEventBYName._id),
        albumImageUrl: data.albumImageUrl,
        tags: data.tags,
        images: [],
        imageCount: 0,
        status: data.status,
        visibility: data.visibility,
        uploadedBy: data.uploadedBy,
      });

      SendResponse.SuccessResponse(
        res,
        createGallery,
        "Gallery Created Successfully",
      );
    } catch (error) {
      console.log(error);
      let { errorData, message } = normalizeError(error);
      SendResponse.ErrorResponse(res, errorData, message);
    }
  };

  
}

export default new GalleryController();
