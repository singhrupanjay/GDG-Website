import { Request, Response, NextFunction } from "express";
import slugify from "slugify";
import crypto from "crypto";
import { Event_Permissions } from "../Permission/Permission.constant";
import { permissionService } from "../Permission/Permission.service";
import SendResponse from "../../../utils/SendResponse";
import { eventService } from "./Event.Service";

class EventController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      let userId = (req as Request & { userId?: string }).userId;

      console.log("User ID:--->", userId); // Log the userId to verify it's being set correctly

      let checkPermissions = await permissionService.check_UserPermission(
        String(userId),
        Event_Permissions.CREATE_EVENT,
      );
      if (!checkPermissions) {
        throw new Error(
          "Forbidden: You don't have permission to create events",
        );
      }

      let CreateEvent = await eventService.createNewEvent({
        Slug: slugify(
          req.body.title + "-" + crypto.randomBytes(4).toString("hex"),
          { lower: true },
        ),
        createdBy: String(userId),
        ...req.body,
      });
      SendResponse.SuccessResponse(
        res,
        CreateEvent,
        "Event created successfully",
      );
    } catch (error) {
      SendResponse.ErrorResponse(res, error, "Failed to create event");
    }
  }
}

export let eventController = new EventController();
