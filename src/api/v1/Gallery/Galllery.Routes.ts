import { Router } from "express";
import AuthMiddleware from "../Auth/Auth.middleware";
import GalleryController from "./Gallery.Controller";

const routes = Router();

routes.post(
  "/create/newGallery",
  AuthMiddleware.verifyAccessToken,
  GalleryController.Create_New_Gallery,
);
