import { Router } from "express";
import { permissionController } from "./Permission.controller";

const route = Router();

route.get("/get/member/permissions", permissionController.getUserPermissions);

export { route as PermissionRoutes };
