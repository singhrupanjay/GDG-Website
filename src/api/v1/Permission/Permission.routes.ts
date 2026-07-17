import { Router } from "express";
import { permissionController } from "./Permission.controller";
import AuthMiddleware from "../Auth/Auth.middleware";

const route = Router();
// /api/v1/permission/get/member/permissions?userId=<memberId>
route.get(
  "/permission/get/member/permissions",
  AuthMiddleware.verifyAccessToken,
  permissionController.getUserPermissions,
);

//  Test these two Routes
route.post(
  "/permission/add/member/permissions",
  AuthMiddleware.verifyAccessToken,
  permissionController.addPermissions,
);

route.post(
  "/remove/member/permissions/:userId",
  AuthMiddleware.verifyAccessToken,
  permissionController.removePermission,
);

export { route as PermissionRoutes };
