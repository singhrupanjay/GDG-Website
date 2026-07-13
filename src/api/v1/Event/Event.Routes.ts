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
  AuthMiddleware.verifyAccessToken,
  eventController.Find_PastEvents,
);

router.get(
  "/find/upcomingEvents",
  AuthMiddleware.verifyAccessToken,
  eventController.Find_UpcomingEvents,
);

router.get(
  "/find/ongoingEvents",
  AuthMiddleware.verifyAccessToken,
  eventController.Find_OngoingEvents,
);

router.get(
  "/find/registrationOpenEvents",
  AuthMiddleware.verifyAccessToken,
  eventController.Find_RegistrationOpenEvents,
);

export { router as EventRouter };
