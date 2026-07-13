import { Request, Response, NextFunction } from "express";
import { Event_Permissions } from "../Permission/Permission.constant";
import { permissionService } from "../Permission/Permission.service";
import SendResponse from "../../../utils/SendResponse";

class EventController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      let userId = (req as Request & { userId?: string }).userId;

      let checkPermissions = await permissionService.check_UserPermission(
        String(userId),
        Event_Permissions.CREATE_EVENT,
      );
      if (!checkPermissions) {
        throw new Error(
          "Forbidden: You don't have permission to create events",
        );
      }


      
    } catch (error) {
      SendResponse.ErrorResponse(res, error, "Failed to create event");
    }
  }
}

export let eventController = new EventController();
