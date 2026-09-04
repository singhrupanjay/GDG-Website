import { Router } from "express";
import { AuthRoutes } from "../api/v1/Auth/Auth.routes";
import { HealthRoutes } from "../api/v1/Health/Health.routes";
import { MemberRoutes } from "../api/v1/Member/Member.routes";
import { communityRouter } from "../api/v1/Community/Community.Router";
import { PermissionRoutes } from "../api/v1/Permission/Permission.routes";
import { EventRouter } from "../api/v1/Event/Event.Routes";
import { PartnerRoutes } from "../api/v1/Partners_And_Sponsors/Partner.Routes";
import { GalleryRoutes } from "../api/v1/Gallery/Galllery.Routes";

const route = Router();

route.use(
  "/api/v1",
  HealthRoutes,
  GalleryRoutes,
  AuthRoutes,
  MemberRoutes,
  communityRouter,
  EventRouter,
  PartnerRoutes,
  PermissionRoutes,
);

export { route };
