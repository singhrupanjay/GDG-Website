import { PermissionSchemaType } from "./Permission.model";

/* ==========================================================================
   EVENT PERMISSIONS
   ========================================================================== */

export const Event_Permissions = {
  CREATE_EVENT: "event:create",
  VIEW_EVENT: "event:view",
  UPDATE_EVENT: "event:update",
  DELETE_EVENT: "event:delete",
  ARCHIVE_EVENT: "event:archive",
  PUBLISH_EVENT: "event:publish",
};

/* ==========================================================================
   GALLERY PERMISSIONS
   ========================================================================== */

export const Gallery_Permissions = {
  CREATE_GALLERY: "gallery:create",
  VIEW_GALLERY: "gallery:view",
  UPDATE_GALLERY: "gallery:update",
  DELETE_GALLERY: "gallery:delete",
  UPLOAD_IMAGE: "gallery:image:upload",
  VIEW_IMAGE: "gallery:image:view",
  UPDATE_IMAGE: "gallery:image:update",
  DELETE_IMAGE: "gallery:image:delete",
};

/* ==========================================================================
   USER PERMISSIONS
   ========================================================================== */

export const User_Permissions = {
  CREATE_USERS: "user:create",
  VIEW_USERS: "user:view",
  UPDATE_USERS: "user:update",
  DELETE_USERS: "user:delete",
};

/* ==========================================================================
   ORGANIZATION MEMBER PERMISSIONS
   ========================================================================== */

export const Member_Permissions = {
  CREATE_MEMBER: "member:create",
  VIEW_MEMBER: "member:view",
  UPDATE_MEMBER: "member:update",
  DELETE_MEMBER: "member:delete",
};

/* ==========================================================================
   SYSTEM PERMISSIONS
   ========================================================================== */

export const Permission_Permissions = {
  CREATE_PERMISSION: "permission:create",
  VIEW_PERMISSION: "permission:view",
  UPDATE_PERMISSION: "permission:update",
  DELETE_PERMISSION: "permission:delete",
};

/* ==========================================================================
   EVENT ROLE PERMISSIONS
   (NOT Organization Permissions)
   ========================================================================== */

export const Judge_Permissions = {
  ADD_JUDGE: "judge:add",
  REMOVE_JUDGE: "judge:remove",
  UPDATE_JUDGE: "judge:update",
  VIEW_JUDGE: "judge:view",
};

export const Mentor_Permissions = {
  ADD_MENTOR: "mentor:add",
  REMOVE_MENTOR: "mentor:remove",
  UPDATE_MENTOR: "mentor:update",
  VIEW_MENTOR: "mentor:view",
};

export const Volunteer_Permissions = {
  ADD_VOLUNTEER: "volunteer:add",
  REMOVE_VOLUNTEER: "volunteer:remove",
  UPDATE_VOLUNTEER: "volunteer:update",
  VIEW_VOLUNTEER: "volunteer:view",
};

/* ==========================================================================
   DEFAULT ORGANIZATION PERMISSIONS
   ========================================================================== */

export const Default_Organization_Permissions: PermissionSchemaType[] = [
  /* ================= Members ================= */

  {
    name: Member_Permissions.CREATE_MEMBER,
    action: "create",
    resource: "Member",
    description: "Create organization members",
  },
  {
    name: Member_Permissions.VIEW_MEMBER,
    action: "read",
    resource: "Member",
    description: "View organization members",
  },
  {
    name: Member_Permissions.UPDATE_MEMBER,
    action: "update",
    resource: "Member",
    description: "Update organization members",
  },
  {
    name: Member_Permissions.DELETE_MEMBER,
    action: "delete",
    resource: "Member",
    description: "Delete organization members",
  },

  /* ================= Events ================= */

  {
    name: Event_Permissions.CREATE_EVENT,
    action: "create",
    resource: "Event",
    description: "Create events",
  },
  {
    name: Event_Permissions.VIEW_EVENT,
    action: "read",
    resource: "Event",
    description: "View events",
  },
  {
    name: Event_Permissions.UPDATE_EVENT,
    action: "update",
    resource: "Event",
    description: "Update events",
  },
  {
    name: Event_Permissions.DELETE_EVENT,
    action: "delete",
    resource: "Event",
    description: "Delete events",
  },
  {
    name: Event_Permissions.ARCHIVE_EVENT,
    action: "update",
    resource: "Event",
    description: "Archive events",
  },
  {
    name: Event_Permissions.PUBLISH_EVENT,
    action: "update",
    resource: "Event",
    description: "Publish events",
  },

  /* ================= Gallery ================= */

  {
    name: Gallery_Permissions.CREATE_GALLERY,
    action: "create",
    resource: "Gallery",
    description: "Create galleries",
  },
  {
    name: Gallery_Permissions.VIEW_GALLERY,
    action: "read",
    resource: "Gallery",
    description: "View galleries",
  },
  {
    name: Gallery_Permissions.UPDATE_GALLERY,
    action: "update",
    resource: "Gallery",
    description: "Update galleries",
  },
  {
    name: Gallery_Permissions.DELETE_GALLERY,
    action: "delete",
    resource: "Gallery",
    description: "Delete galleries",
  },

  {
    name: Gallery_Permissions.UPLOAD_IMAGE,
    action: "create",
    resource: "GalleryImage",
    description: "Upload gallery images",
  },
  {
    name: Gallery_Permissions.VIEW_IMAGE,
    action: "read",
    resource: "GalleryImage",
    description: "View gallery images",
  },
  {
    name: Gallery_Permissions.UPDATE_IMAGE,
    action: "update",
    resource: "GalleryImage",
    description: "Update gallery images",
  },
  {
    name: Gallery_Permissions.DELETE_IMAGE,
    action: "delete",
    resource: "GalleryImage",
    description: "Delete gallery images",
  },

  /* ================= Users ================= */

  {
    name: User_Permissions.CREATE_USERS,
    action: "create",
    resource: "User",
    description: "Create users",
  },
  {
    name: User_Permissions.VIEW_USERS,
    action: "read",
    resource: "User",
    description: "View users",
  },
  {
    name: User_Permissions.UPDATE_USERS,
    action: "update",
    resource: "User",
    description: "Update users",
  },
  {
    name: User_Permissions.DELETE_USERS,
    action: "delete",
    resource: "User",
    description: "Delete users",
  },

  /* ================= Permissions ================= */

  {
    name: Permission_Permissions.CREATE_PERMISSION,
    action: "create",
    resource: "Permission",
    description: "Create permissions",
  },
  {
    name: Permission_Permissions.VIEW_PERMISSION,
    action: "read",
    resource: "Permission",
    description: "View permissions",
  },
  {
    name: Permission_Permissions.UPDATE_PERMISSION,
    action: "update",
    resource: "Permission",
    description: "Update permissions",
  },
  {
    name: Permission_Permissions.DELETE_PERMISSION,
    action: "delete",
    resource: "Permission",
    description: "Delete permissions",
  },
];

/* ==========================================================================
   DEFAULT MEMBER PERMISSIONS
   ========================================================================== */

export const Default_Member_Permissions: PermissionSchemaType[] = [
  {
    name: Member_Permissions.VIEW_MEMBER,
    action: "read",
    resource: "Member",
    description: "View organization members",
  },
];
