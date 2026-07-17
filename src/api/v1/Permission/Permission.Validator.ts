import { z } from "zod";

export const PermissionActionEnum = z.enum([
  "create",
  "read",
  "update",
  "delete",
]);

/* ==========================================================================
   Single Permission Schema
   ========================================================================== */

export const PermissionSchemaValidator = z.object({
  name: z
    .string("Permission name is required")
    .trim()
    .min(1, "Permission name is required"),

  action: PermissionActionEnum,

  resource: z
    .string("Resource is required")
    .trim()
    .min(1, "Resource is required"),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),

  level: z.number().int().min(0).max(100).optional().default(0),
});

/* ==========================================================================
   Create Permission
   ========================================================================== */

export const addPermission = z
  .array(PermissionSchemaValidator)
  .min(1, "At least one permission is required");

/* ==========================================================================
   Update Permission
   ========================================================================== */

export const UpdatePermissionValidator = z.object({
  permission: z.array(PermissionSchemaValidator).optional(),

  userId: z.string().optional().nullable(),
});

/* ==========================================================================
   Types
   ========================================================================== */

export type PermissionSchemaValidatorType = z.infer<
  typeof PermissionSchemaValidator
>;

export type addPermissionType = z.infer<typeof addPermission>;

export type UpdatePermissionValidatorType = z.infer<
  typeof UpdatePermissionValidator
>;
