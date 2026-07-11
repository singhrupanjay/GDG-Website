import { Router } from "express";
import { upload } from "../../../utils/Multer.utils";

import AuthController from "./Auth.Controller";
const router = Router();

router.post("/auth/login", AuthController.LoginUser);

router.post("/auth/forgot-password", AuthController.ForgotPassword);

router.post("/auth/change-password", AuthController.changePassword);

router.post(
  "/auth/community-signup",
  upload.single("Logo"),
  AuthController.CommunitySignUp,
);

export { router as AuthRoutes };
