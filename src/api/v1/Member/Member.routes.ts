import { Router } from "express";
const route = Router();

import { memberController } from "./Member.Controller";
import AuthMiddleware from "../Auth/Auth.middleware";

route.post(
  "/member/create",
  AuthMiddleware.verifyAccessToken,
  memberController.createNewMember,
);

route.get(
  "/member/get/allMembers",
  AuthMiddleware.verifyAccessToken,
  memberController.findAllMembers,
);

export { route as MemberRoutes };
