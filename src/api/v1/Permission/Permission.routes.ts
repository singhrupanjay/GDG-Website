import { Router } from "express";
import { permissionController } from "./Permission.controller";

const route = Router();

route.get("/get/member/permissions", permissionController.getUserPermissions);

//  Test these two Routes
route.post(
  "/add/member/permissions/:userId",
  permissionController.addPermissions,
);
route.post(
  "/remove/member/permissions/:userId",
  permissionController.removePermission,
);

export { route as PermissionRoutes };
