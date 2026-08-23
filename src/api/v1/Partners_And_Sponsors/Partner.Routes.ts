import { Router } from "express";
import AuthMiddleware from "../Auth/Auth.middleware";
import PartnerController from "./Partner.Controller";

const route = Router();

route.post(
  "/create/newPartnerOrSponsor",
  AuthMiddleware.verifyAccessToken,
  PartnerController.createNewPartner,
);

export { route as PartnerRoutes };
