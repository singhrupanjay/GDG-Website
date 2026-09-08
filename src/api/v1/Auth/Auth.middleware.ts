import { NextFunction, Response } from "express";
import { authUtils } from "./Auth.Utils";
import SendResponse from "../../../utils/SendResponse";
import normalizeError from "../../../utils/normalizeError";
import type { Request } from "express";

export type AuthenticatedRequest = Request & {
  userId?: string;
};

class AuthMiddleware {
  public verifyAccessToken = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const authorization = req.headers.authorization;

      const bearerToken = authorization?.startsWith("Bearer ")
        ? authorization.slice(7).trim()
        : undefined;

      const token = req.cookies?.accessToken || bearerToken;

      console.log("Token", token);

      if (!token) {
        throw new Error("Unauthorized: No token provided");
      }

      const decodedData = await authUtils.verifyAccessToken(token);

      const userId = decodedData.data?._id;

      console.log("User Id", userId);

      if (!userId) {
        throw new Error("Unauthorized: Invalid token");
      }

      req.userId = userId;

      next();
    } catch (error) {
      const normalizedError = normalizeError(error);

      SendResponse.ErrorResponse(res, normalizedError, normalizedError.message);
    }
  };
}

export default new AuthMiddleware();
