import { Router } from "express";
import { AuthRoutes } from "../api/v1/Auth/Auth.routes";
import { HealthRoutes } from "../api/v1/Health/Health.routes";
const route = Router();

route.use("/api/v1", HealthRoutes, AuthRoutes);

export { route };
