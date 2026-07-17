# Permission Api doc

Manage member permissions within the organization. This module allows authorized organizers to grant, view, verify, and remove permissions assigned to organization members.

---

# Authentication

Every protected endpoint requires a valid JWT access token.

```
Authorization: Bearer <access_token>
```

---

# Required Permissions

| Endpoint                        | Required Permission |
| ------------------------------- | ------------------- |
| Get Member Permissions          | `permission:view`   |
| Add Member Permissions          | `permission:create` |
| Remove Member Permissions       | `permission:delete` |
| Check Permission                | `permission:view`   |
| Assign Organization Permissions | `permission:update` |

---

# Permission Constants

## Event Permissions

| Constant      | Value           |
| ------------- | --------------- |
| CREATE_EVENT  | `event:create`  |
| VIEW_EVENT    | `event:view`    |
| UPDATE_EVENT  | `event:update`  |
| DELETE_EVENT  | `event:delete`  |
| ARCHIVE_EVENT | `event:archive` |
| PUBLISH_EVENT | `event:publish` |

---

## Gallery Permissions

### Gallery

| Constant       | Value            |
| -------------- | ---------------- |
| CREATE_GALLERY | `gallery:create` |
| VIEW_GALLERY   | `gallery:view`   |
| UPDATE_GALLERY | `gallery:update` |
| DELETE_GALLERY | `gallery:delete` |

### Gallery Images

| Constant     | Value                  |
| ------------ | ---------------------- |
| UPLOAD_IMAGE | `gallery:image:upload` |
| VIEW_IMAGE   | `gallery:image:view`   |
| UPDATE_IMAGE | `gallery:image:update` |
| DELETE_IMAGE | `gallery:image:delete` |

---

## User Permissions

| Constant     | Value         |
| ------------ | ------------- |
| CREATE_USERS | `user:create` |
| VIEW_USERS   | `user:view`   |
| UPDATE_USERS | `user:update` |
| DELETE_USERS | `user:delete` |

---

## Member Permissions

| Constant      | Value           |
| ------------- | --------------- |
| CREATE_MEMBER | `member:create` |
| VIEW_MEMBER   | `member:view`   |
| UPDATE_MEMBER | `member:update` |
| DELETE_MEMBER | `member:delete` |

---

## Permission Management

| Constant          | Value               |
| ----------------- | ------------------- |
| CREATE_PERMISSION | `permission:create` |
| VIEW_PERMISSION   | `permission:view`   |
| UPDATE_PERMISSION | `permission:update` |
| DELETE_PERMISSION | `permission:delete` |

---

## Judge Permissions (Event Scoped)

| Constant     | Value          |
| ------------ | -------------- |
| ADD_JUDGE    | `judge:add`    |
| VIEW_JUDGE   | `judge:view`   |
| UPDATE_JUDGE | `judge:update` |
| REMOVE_JUDGE | `judge:remove` |

---

## Mentor Permissions (Event Scoped)

| Constant      | Value           |
| ------------- | --------------- |
| ADD_MENTOR    | `mentor:add`    |
| VIEW_MENTOR   | `mentor:view`   |
| UPDATE_MENTOR | `mentor:update` |
| REMOVE_MENTOR | `mentor:remove` |

---

## Volunteer Permissions (Event Scoped)

| Constant         | Value              |
| ---------------- | ------------------ |
| ADD_VOLUNTEER    | `volunteer:add`    |
| VIEW_VOLUNTEER   | `volunteer:view`   |
| UPDATE_VOLUNTEER | `volunteer:update` |
| REMOVE_VOLUNTEER | `volunteer:remove` |

---

# Endpoint 1 — Get Member Permissions

### Endpoint

```
GET /api/v1/permission/get/member/permissions?userId=<memberId>
```

### Authentication

```
Bearer Token Required
```

### Required Permission

```
permission:view
```

### Query Parameters

| Name   | Type   | Required | Description    |
| ------ | ------ | -------- | -------------- |
| userId | string | Yes      | Member Auth ID |

### Success Response (200)

```json
{
  "success": true,
  "message": "User permissions retrieved",
  "data": [
    {
      "name": "member:view",
      "action": "read",
      "resource": "organization",
      "level": 0,
      "_id": "6a54a4daf9ac87469c5786ff",
      "createdAt": "2026-07-13T08:42:02.329Z",
      "updatedAt": "2026-07-13T08:42:02.329Z"
    },
    {
      "name": "member:update",
      "action": "update",
      "resource": "organization",
      "level": 0,
      "_id": "6a54a4daf9ac87469c578700",
      "createdAt": "2026-07-13T08:42:02.329Z",
      "updatedAt": "2026-07-13T08:42:02.329Z"
    },
    {
      "name": "member:delete",
      "action": "delete",
      "resource": "organization",
      "level": 0,
      "_id": "6a54a4daf9ac87469c578701",
      "createdAt": "2026-07-13T08:42:02.329Z",
      "updatedAt": "2026-07-13T08:42:02.329Z"
    },
    {
      "name": "member:create",
      "action": "create",
      "resource": "create New Member",
      "description": "Permission to create new members in the organization",
      "level": 0,
      "_id": "6a54a4daf9ac87469c578702",
      "createdAt": "2026-07-13T08:42:02.329Z",
      "updatedAt": "2026-07-13T08:42:02.329Z"
    },
    {
      "name": "event:create",
      "action": "create",
      "resource": "create New Event",
      "description": "Permission to create new events in the organization",
      "level": 0,
      "_id": "6a54a4daf9ac87469c578703",
      "createdAt": "2026-07-13T08:42:02.329Z",
      "updatedAt": "2026-07-13T08:42:02.329Z"
    },
    {
      "name": "event:update",
      "action": "update",
      "resource": "update Event",
      "description": "Permission to update events in the organization",
      "level": 0,
      "_id": "6a54a4daf9ac87469c578704",
      "createdAt": "2026-07-13T08:42:02.329Z",
      "updatedAt": "2026-07-13T08:42:02.329Z"
    },
    {
      "name": "event:delete",
      "action": "delete",
      "resource": "delete Event",
      "description": "Permission to delete events in the organization",
      "level": 0,
      "_id": "6a54a4daf9ac87469c578705",
      "createdAt": "2026-07-13T08:42:02.329Z",
      "updatedAt": "2026-07-13T08:42:02.329Z"
    },
    {
      "name": "event:view",
      "action": "read",
      "resource": "view Event",
      "description": "Permission to view events in the organization",
      "level": 0,
      "_id": "6a54a4daf9ac87469c578706",
      "createdAt": "2026-07-13T08:42:02.329Z",
      "updatedAt": "2026-07-13T08:42:02.329Z"
    },
    {
      "name": "permission:create",
      "action": "create",
      "resource": "create New Permission",
      "description": "Permission to create new permissions in the organization",
      "level": 0,
      "_id": "6a54a4daf9ac87469c578707",
      "createdAt": "2026-07-13T08:42:02.329Z",
      "updatedAt": "2026-07-13T08:42:02.329Z"
    },
    {
      "name": "permission:update",
      "action": "update",
      "resource": "update Permission",
      "description": "Permission to update permissions in the organization",
      "level": 0,
      "_id": "6a54a4daf9ac87469c578708",
      "createdAt": "2026-07-13T08:42:02.329Z",
      "updatedAt": "2026-07-13T08:42:02.329Z"
    },
    {
      "name": "permission:delete",
      "action": "delete",
      "resource": "delete Permission",
      "description": "Permission to delete permissions in the organization",
      "level": 0,
      "_id": "6a54a4daf9ac87469c578709",
      "createdAt": "2026-07-13T08:42:02.329Z",
      "updatedAt": "2026-07-13T08:42:02.329Z"
    },
    {
      "name": "permission:view",
      "action": "read",
      "resource": "view Permission",
      "description": "Permission to view permissions in the organization",
      "level": 0,
      "_id": "6a54a4daf9ac87469c57870a",
      "createdAt": "2026-07-13T08:42:02.329Z",
      "updatedAt": "2026-07-13T08:42:02.329Z"
    }
  ]
}
```

---

# Endpoint 2 — Add Permissions

### Endpoint

```
POST /api/v1/permission/add/member/permissions
```

### Authentication

```
Bearer Token Required
```

### Required Permission

```
permission:create
```

### Request Body

```json
{
  "memberId": "686f123abc456",
  "permission": [
    {
      "name": "event:update",
      "action": "update",
      "resource": "Event",
      "description": "Update Event",
      "level": 0
    },
    {
      "name": "gallery:image:upload",
      "action": "create",
      "resource": "GalleryImage",
      "description": "Upload Images",
      "level": 0
    }
  ]
}
```

### Success Response

```json
{
  "success": true,
  "message": "Granted Permission to Member",
  "data": {
    "modifiedCount": 2
  }
}
```

---

# Endpoint 3 — Remove Permission

### Endpoint

```
POST /api/v1/permission/remove/member/permissions/:userId
```

### Authentication

```
Bearer Token Required
```

### Required Permission

```
permission:delete
```

### Request Body

```json
{
  "resource": "gallery:image:upload"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Permission removed",
  "data": {
    "modifiedCount": 1
  }
}
```

---

# Common Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "message": "Validation Failed"
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "message": "Access token is missing"
}
```

### 403 Forbidden

```json
{
  "success": false,
  "message": "Forbidden: You don't have permission to perform this action"
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Member not found"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---
