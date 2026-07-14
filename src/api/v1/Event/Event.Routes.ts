import { Router } from "express";
const router = Router();
import { eventController } from "./Event.Controller";
import AuthMiddleware from "../Auth/Auth.middleware";

router.post(
  "/create/newEvent",
  AuthMiddleware.verifyAccessToken,
  eventController.create,
);

router.get(
  "/find/pastEvents",
  eventController.Find_PastEvents,
);

router.get(
  "/find/upcomingEvents",
  eventController.Find_UpcomingEvents,
);

router.get(
  "/find/ongoingEvents",
  eventController.Find_OngoingEvents,
);

router.get(
  "/find/registrationOpenEvents",
  eventController.Find_RegistrationOpenEvents,
);

export { router as EventRouter };
