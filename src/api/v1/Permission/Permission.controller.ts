import { Request, Response } from "express";
import SendResponse from "../../../utils/SendResponse";
import { permissionService } from "./Permission.service";
import { Permission_Permissions } from "./Permission.constant";
import { authUtils } from "../Auth/Auth.Utils";

class PermissionController {
  async getUserPermissions(req: Request, res: Response) {
    try {
      const userId = req.query?.userId || req.params?.userId || req.body?.userId || (req as any).userId;
      console.log("Fetching permissions for userId:-->", userId);

      if (!userId) {
        throw new Error("userId parameter is required");
      }
      const perms = await permissionService.getPermissionsForUser(
        String(userId),
      );
      return SendResponse.SuccessResponse(
        res,
        perms,
        "User permissions retrieved",
      );
    } catch (error: any) {
      return SendResponse.ErrorResponse(
        res,
        error,
        error?.message || "Failed to get permissions",
      );
    }
  }

  async addPermissions(req: Request, res: Response) {
    let userId = (req as Request & { userId?: string }).userId;

    let checkPermissions = await permissionService.check_UserPermission(
      String(userId),
      Permission_Permissions.CREATE_PERMISSION,
    );
    if (!checkPermissions) {
      throw new Error("Forbidden: You don't have permission to add Permission");
    }

    try {
      const permission = req.body?.permission;
      const memberId = req.body?.memberId;

      if (!Array.isArray(permission)) {
        return SendResponse.ErrorResponse(
          res,
          null,
          "Expected array of permissions",
        );
      }

      let findUser = await authUtils.getUserById(memberId);

      if (!findUser) {
        throw new Error(
          "Failed to find Member please pass the Correct Member Id to add Permission",
        );
      }

      const result = await permissionService.createPermission(
        permission,
        String(memberId),
      );
      return SendResponse.SuccessResponse(
        res,
        result,
        "Granted Permission to Member ",
      );
    } catch (error: any) {
      console.log(error);
      return SendResponse.ErrorResponse(
        res,
        error,
        error?.message || "Failed to add permissions",
      );
    }
  }

  async assignOrganization(req: Request, res: Response) {
    try {
      const userId = req.params?.userId || req.body?.userId || req.query?.userId;
      if (!userId) throw new Error("userId parameter is required");
      
      const result = await permissionService.assignOrganizationPermissions(
        String(userId),
      );
      return SendResponse.SuccessResponse(
        res,
        result,
        "Organization permissions assigned",
      );
    } catch (error: any) {
      return SendResponse.ErrorResponse(
        res,
        error,
        error?.message || "Failed to assign organization permissions",
      );
    }
  }

  async checkPermission(req: Request, res: Response) {
    try {
      const userId = req.params?.userId || req.body?.userId || req.query?.userId;
      if (!userId) throw new Error("userId parameter is required");

      const { name, minLevel } = req.query as any;
      if (!name)
        return SendResponse.ErrorResponse(res, null, "name query required");
      const ok = await permissionService.check_UserPermissionWithLevel(
        String(userId),
        name,
        Number(minLevel) || 0,
      );
      return SendResponse.SuccessResponse(
        res,
        { hasPermission: ok },
        "Permission check completed",
      );
    } catch (error: any) {
      return SendResponse.ErrorResponse(
        res,
        error,
        error?.message || "Failed to check permission",
      );
    }
  }

  async removePermission(req: Request, res: Response) {
    try {
      const userId = req.params?.userId || req.body?.userId || req.query?.userId;
      if (!userId) throw new Error("userId parameter is required");

      const { resource } = req.body;
      if (!resource)
        return SendResponse.ErrorResponse(res, null, "resource required in body");
      const result = await permissionService.removePermissionFromUser(
        String(userId),
        resource,
      );
      return SendResponse.SuccessResponse(res, result, "Permission removed");
    } catch (error: any) {
      return SendResponse.ErrorResponse(
        res,
        error,
        error?.message || "Failed to remove permission",
      );
    }
  }
  
  async deletePermission(req: Request, res: Response) {
    try {
      const permissionId = req.params?.permissionId || req.body?.permissionId || req.query?.permissionId;
      if (!permissionId) throw new Error("permissionId parameter is required");

      const result = await permissionService.deletePermissionDoc(
        String(permissionId)
      );
      return SendResponse.SuccessResponse(res, result, "Permission document deleted completely");
    } catch (error: any) {
      return SendResponse.ErrorResponse(
        res,
        error,
        error?.message || "Failed to delete permission",
      );
    }
  }
}

export const permissionController = new PermissionController();
