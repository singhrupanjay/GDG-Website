
import {Router} from "express";
import EventRegistrationController from "./EventRegistration.Controller";

const router = Router();

router.post("/event/register", EventRegistrationController.RegisterEvent);

export {router as EventRegistrationRouter};