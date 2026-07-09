import { NextFunction, Request, Response } from "express";
import { authUtils } from "./Auth.Utils";
import SendResponse from "../../../utils/SendResponse";

class AuthMiddleware {
  async verifyAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(
        "req.headers.authorization-->",
        req.headers.authorization,
        req.cookies,
      );
      const token =
        req.headers.authorization?.split(" ")[1] || req.cookies?.accessToken;

      if (!token) {
        throw new Error("Unauthorized: No token provided");
      }

      const decodedData = await authUtils.verifyAccessToken(token);

      console.log("decodedData-->", decodedData, req.cookies);

      if (!decodedData) {
        throw new Error("Unauthorized: Invalid token");
      }

      const userId = (decodedData as { data: { _id: string } }).data._id;
      (req as Request & { userId?: string }).userId = userId;

      next();
    } catch (error) {
      SendResponse.ErrorResponse(res, error, "Unauthorized: Invalid token");
    }
  }
}

export default new AuthMiddleware();
