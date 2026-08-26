import { Request, Response } from "express";
import SendResponse from "../../../utils/SendResponse";
import GalleryUtils from "./Gallery.Utils";
import { CreateGallerySchema } from "./Gallery.Validator";
import normalizeError from "../../../utils/normalizeError";

import { permissionService } from "../Permission/Permission.service";
import { Gallery_Permissions } from "../Permission/Permission.constant";
import GalleryService from "./Gallery.Service";
import { IGallery } from "./Gallery.Type";
import { eventUtils } from "../Event/Event.Utils";

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

      // 1. Check Permissions
      let checkPermissions = await permissionService.check_UserPermission(
        String(userId),
        Gallery_Permissions.CREATE_GALLERY,
      );

      if (!checkPermissions) {
        throw new Error(
          "Forbidden: You don't have permission to create gallery",
        );
      }

      // 2. Validate Input
      let { success, data, error } = await CreateGallerySchema.safeParseAsync({
        ...req.body,
        uploadedBy: userId, // Force uploadedBy from auth token, ignore body
        imageCount: req.body.images?.length || 0, // Calculate count from images
      });

      if (!success) {
        throw new Error(JSON.stringify(error));
      }

      if (!data) {
        throw new Error("Gallery data is missing");
        // Or handle gracefully: return;
      }

      let findEventBYName = await eventUtils.FIND_EVENT_BY_NAME(
        req.body.EventName,
      );

      if (!findEventBYName) {
        throw new Error("Gallery data is missing");
      }

      // TypeScript now knows 'data' is not undefined here
      let createGallery = await GalleryService.createNewGallery({
        title: data.title,
        tags: data.tags,
        albumImageUrl: data.albumImageUrl,
        event: findEventBYName._id,
        images: [],
        visibility: data.visibility,
        status: data.status,
        imageCount: 0,
      });

      SendResponse.SuccessResponse(
        res,
        createGallery,
        "Gallery Created Successfully",
      );
    } catch (error) {
      let { errorData, message } = normalizeError(error);
      SendResponse.ErrorResponse(res, errorData, message);
    }
  };
}

export default new GalleryController();
