import { Router } from "express";
const router = Router();
import { eventController } from "./Event.Controller";
import AuthMiddleware from "../Auth/Auth.middleware";

router.post(
  "/create/newEvent",
  AuthMiddleware.verifyAccessToken,
  eventController.create,
);

export { router as EventRouter };
