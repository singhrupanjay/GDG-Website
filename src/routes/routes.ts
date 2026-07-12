import { Router } from "express";
import { AuthRoutes } from "../api/v1/Auth/Auth.routes";
import { HealthRoutes } from "../api/v1/Health/Health.routes";
import { MemberRoutes } from "../api/v1/Member/Member.routes";
import { communityRouter } from "../api/v1/Community/Community.Router";
import { PermissionRoutes } from "../api/v1/Permission/Permission.routes";

const route = Router();

route.use(
  "/api/v1",
  HealthRoutes,
  AuthRoutes,
  MemberRoutes,
  communityRouter,
  PermissionRoutes,
);

export { route };
