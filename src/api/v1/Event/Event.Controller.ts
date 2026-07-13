import { Request, Response, NextFunction } from "express";
import slugify from "slugify";
import crypto from "crypto";
import { Event_Permissions } from "../Permission/Permission.constant";
import { permissionService } from "../Permission/Permission.service";
import SendResponse from "../../../utils/SendResponse";
import { eventService } from "./Event.Service";
import { eventUtils } from "./Event.Utils";

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

  public async Find_PastEvents(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      let PastEvents = await eventUtils.FIND_PAST_EVENTS();
      SendResponse.SuccessResponse(
        res,
        PastEvents,
        "Past events fetched successfully",
      );
    } catch (error) {
      SendResponse.ErrorResponse(res, error, "Failed to fetch past events");
    }
  }

  public async Find_UpcomingEvents(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      let UpcomingEvents = await eventUtils.FIND_UPCOMING_EVENTS();
      SendResponse.SuccessResponse(
        res,
        UpcomingEvents,
        "Upcoming events fetched successfully",
      );
    } catch (error) {
      SendResponse.ErrorResponse(res, error, "Failed to fetch upcoming events");
    }
  }

  public async Find_OngoingEvents(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      let OngoingEvents = await eventUtils.FIND_ONGOING_EVENTS();
      SendResponse.SuccessResponse(
        res,
        OngoingEvents,
        "Ongoing events fetched successfully",
      );
    } catch (error) {
      SendResponse.ErrorResponse(res, error, "Failed to fetch ongoing events");
    }
  }

  public async Find_RegistrationOpenEvents(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      let RegistrationOpenEvents =
        await eventUtils.FIND_REGISTRATION_OPEN_EVENTS();
      SendResponse.SuccessResponse(
        res,
        RegistrationOpenEvents,
        "Registration open events fetched successfully",
      );
    } catch (error) {
      SendResponse.ErrorResponse(
        res,
        error,
        "Failed to fetch registration open events",
      );
    }
  }
}

export let eventController = new EventController();
