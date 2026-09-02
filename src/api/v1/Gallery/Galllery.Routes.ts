import { Router } from "express";
import AuthMiddleware from "../Auth/Auth.middleware";
import GalleryController from "./Gallery.Controller";

const routes = Router();

routes.post(
  "/create/newGallery",
  AuthMiddleware.verifyAccessToken,
  GalleryController.Create_New_Gallery,
);

routes.get("/findGalleryBySlug", GalleryController.FIND_SINGLE_GALLERY);

routes.get("/findAllGallery", GalleryController.FIND_ALL_GALLERY);

export { routes as GalleryRoutes };
