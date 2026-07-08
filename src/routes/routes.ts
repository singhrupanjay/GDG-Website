import { Router } from "express";
import { AuthRoutes } from "../api/v1/Auth/Auth.routes";
import { HealthRoutes } from "../api/v1/Health/Health.routes";
import { MemberRoutes } from "../api/v1/Member/Member.routes";
import { communityRouter } from "../api/v1/Community/Community.Router";
const route = Router();

route.use("/api/v1", HealthRoutes, AuthRoutes, MemberRoutes, communityRouter);

export { route };
