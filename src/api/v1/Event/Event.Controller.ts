import { Request, Response, NextFunction } from "express";
import slugify from "slugify";
import crypto from "crypto";
import { Event_Permissions } from "../Permission/Permission.constant";
import { permissionService } from "../Permission/Permission.service";
import SendResponse from "../../../utils/SendResponse";
import { eventService } from "./Event.Service";
import { eventUtils } from "./Event.Utils";
import { EventMode } from "./event.type";
import normalizeError from "../../../utils/normalizeError";
import { FindAllEventQuerySchema } from "./Event.Validate";

class EventController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as Request & { userId?: string }).userId;

      if (!userId) {
        throw new Error("User Id is Required");
      }

      const hasPermission = await permissionService.check_UserPermission(
        userId,
        Event_Permissions.CREATE_EVENT,
      );

      if (!hasPermission) {
        throw new Error(
          "Forbidden: You don't have permission to create events",
        );
      }

      const event = await eventService.createNewEvent({
        ...req.body,
        Slug: slugify(
          `${req.body.title}-${crypto.randomBytes(4).toString("hex")}`,
          {
            lower: true,
            strict: true,
            trim: true,
          },
        ),
        createdBy: userId,
      });

      return SendResponse.SuccessResponse(
        res,
        event,
        "Event created successfully",
      );
    } catch (error) {
      console.error(error);

      const normalizedError = normalizeError(error);

      return SendResponse.ErrorResponse(
        res,
        normalizedError.errorData,
        normalizedError.message,
      );
    }
  }

  public async updateEvent(req: Request, res: Response, next: NextFunction) {
    try {
      let userId = (req as Request & { userId?: string }).userId;

      if (!userId) throw new Error("User Not Authenticated");

      let checkPermissions = await permissionService.check_UserPermission(
        String(userId),
        Event_Permissions.UPDATE_EVENT,
      );
      if (!checkPermissions) {
        throw new Error("Forbidden: You don't have permission to update event");
      }

      const { Slug } = req.params;
      console.log("Slug", Slug);

      if (!Slug || typeof Slug !== "string" || Slug.trim() === "") {
        throw new Error("Event slug is required and cannot be empty");
      }

      let FindEvent = await eventUtils.FIND_EVENT_BY_SLUG(Slug);

      if (!FindEvent) {
        throw new Error("Failed to Find Event");
      }

      let UpdateEvent = await eventService.updateEvent(Slug, req.body);

      SendResponse.SuccessResponse(
        res,
        UpdateEvent,
        "Event Updated Successfully",
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      console.error("Error in Find_Event_By_Slug:", error);

      return SendResponse.ErrorResponse(res, error, errorMessage);
    }
  }

  public async Find_All_Event(req: Request, res: Response) {
    try {
      let userId = (req as Request & { userId?: string }).userId;

      if (!userId) throw new Error("User Not Authenticated");

      let checkPermissions = await permissionService.check_UserPermission(
        String(userId),
        Event_Permissions.VIEW_EVENT,
      );

      if (!checkPermissions) {
        throw new Error(
          "Forbidden: You don't have permission to find all event",
        );
      }

      const { Limit, Page } = req.query;

      if (!Limit || !Page) {
        throw new Error("Limit and Page are required");
      }

      const limit = Number(Limit);
      const page = Number(Page);

      if (isNaN(limit) || isNaN(page) || limit <= 0 || page <= 0) {
        throw new Error("Limit and Page must be positive numbers");
      }

      const findAllEvent = await eventUtils.FIND_ALL_EVENT(page, limit);

      SendResponse.SuccessResponse(
        res,
        findAllEvent,
        "Event fetch successfully",
      );
    } catch (error: any) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      return SendResponse.ErrorResponse(res, error, errorMessage);
    }
  }

  public async Find_All_Event_With_Filter(req: Request, res: Response) {
    try {
      const { page, limit, ...filters } = FindAllEventQuerySchema.parse(
        req.query,
      );

      const events = await eventUtils.FIND_ALL_EVENT_With_Filter(
        page,
        limit,
        filters,
      );

      SendResponse.SuccessResponse(res, events, "Events fetched successfully");
    } catch (error) {
      const normalizedError = normalizeError(error);

      SendResponse.ErrorResponse(
        res,
        normalizedError.errorData,
        normalizedError.message,
      );
    }
  }

  public async Find_Event_By_Slug(req: Request, res: Response) {
    try {
      const { Slug } = req.params;
      console.log("Slug", Slug);

      if (!Slug || typeof Slug !== "string" || Slug.trim() === "") {
        throw new Error("Event slug is required and cannot be empty");
      }

      const findEvent = await eventUtils.FIND_EVENT_BY_SLUG(
        String(Slug).trim(),
      );

      if (!findEvent) {
        throw new Error("No event found with the provided slug");
      }

      return SendResponse.SuccessResponse(
        res,
        findEvent,
        "Event retrieved successfully",
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      console.error("Error in Find_Event_By_Slug:", error);

      return SendResponse.ErrorResponse(
        res,
        new Error(errorMessage),
        "Failed to retrieve event",
      );
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

  public async FindAllEventName(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      let FindAllEventName = await eventUtils.FindAllEventName();

      if (!FindAllEventName) {
        throw new Error("Failed to fetch the Event Name with Id from Db.");
      }

      SendResponse.SuccessResponse(
        res,
        FindAllEventName,
        "Fetch all Event Name with Id",
      );
    } catch (error) {
      let Error = normalizeError(error);

      SendResponse.SuccessResponse(res, Error.errorData, Error.message);
    }
  }
}

export let eventController = new EventController();
