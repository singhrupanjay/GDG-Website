import { Request, Response, NextFunction } from "express";
import { Event_Permissions } from "../Permission/Permission.constant";
import { permissionService } from "../Permission/Permission.service";

class EventController {
  async create(req: Request, res: Response, next: NextFunction) {
    // Implementation for creating an event
    // let userId = req.user?.id;
    //  let checkPermissions = await permissionService.check_UserPermission(
    //     String(userId),
    //     Event_Permissions.CREATE_EVENT,
    //   );
    //   if (!checkPermissions) {
    //     throw new Error("Forbidden: You don't have permission to create events");
    //   }
  }
}

export let eventController = new EventController();
