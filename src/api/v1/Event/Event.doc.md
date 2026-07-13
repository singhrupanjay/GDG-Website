## Recommended Event API Documentation Structure (Production Ready)

---

# 1. Create Event

```http
POST /api/v1/events
```

Creates a new event.

### Authorization

```
Bearer Token Required
```

### Permission

```
Community Admin
Organizer
Owner
```

---

## Request Headers

```http
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

## Request Body

```json
{
  "communityId": "688dfe73a4cbad124cdb3d20",
  "title": "Google Cloud Study Jam 2027",
  "shortDescription": "Hands-on workshop on Google Cloud.",
  "descriptionMarkdown": "# Welcome\nLearn Google Cloud from experts.",
  "redirectUrl": "https://gdg.community.dev",
  "tags": [
    "Cloud",
    "GCP",
    "Google"
  ],
  "category": "Workshop",
  "visibility": "PUBLIC",
  "status": "REGISTRATION_OPEN",
  "coverImageUrl": "https://cdn.commdesk.com/events/cloud-cover.jpg",
  "introVideoUrl": "https://youtube.com/watch?v=abcdef",
  "registrationStartAt": "2027-08-20T09:00:00Z",
  "registrationEndAt": "2027-08-30T18:00:00Z",
  "venue": {
    "mode": "OFFLINE",
    "venueName": "Ranchi University",
    "address": "Main Campus",
    "city": "Ranchi",
    "state": "Jharkhand",
    "country": "India",
    "latitude": 23.344,
    "longitude": 85.309
  },
  "mentors": [
    "688a11111111111111111111",
    "688a22222222222222222222"
  ],
  "judges": [
    "688a33333333333333333333"
  ],
  "partners": [
    "688b44444444444444444444"
  ],
  "sponsors": [
    "688b55555555555555555555"
  ],
  "tickets": [
    {
      "name": "General Admission",
      "price": 0,
      "quantity": 300
    }
  ],
  "timeline": [
    {
      "title": "Registration",
      "startTime": "2027-08-20T09:00:00Z",
      "endTime": "2027-08-20T10:00:00Z"
    }
  ],
  "rules": [
    "Carry ID Card",
    "Laptop Required"
  ],
  "requirements": [
    "Basic Programming Knowledge"
  ]
}
```

---

## Success Response

```json
{
  "success": true,
  "message": "Event created successfully.",
  "data": {
    "_id": "6890dc2a44fd9d6db4dcb812",
    "title": "Google Cloud Study Jam 2027",
    "status": "REGISTRATION_OPEN",
    "visibility": "PUBLIC",
    "category": "Workshop",
    "communityId": "688dfe73a4cbad124cdb3d20",
    "createdAt": "2027-08-12T12:15:11Z",
    "updatedAt": "2027-08-12T12:15:11Z"
  }
}
```

---

## Validation

| Field               | Validation                               |
| ------------------- | ---------------------------------------- |
| title               | Required, 3–150 characters               |
| shortDescription    | Maximum 500 characters                   |
| descriptionMarkdown | Required                                 |
| category            | Required                                 |
| visibility          | PUBLIC or PRIVATE                        |
| status              | Valid EventStatus                        |
| registrationEndAt   | Must be greater than registrationStartAt |
| venue               | Required                                 |
| tickets             | Optional                                 |

---

## Business Rules

* Community must exist.
* User must belong to the community.
* Only Organizer/Admin can create events.
* Registration end date must be after start date.
* Event title should be unique within the same community.
* Maximum 20 tags.
* Maximum 50 timeline entries.

---

## Possible Errors

```json
{
    "success": false,
    "message": "Community not found."
}
```

```json
{
    "success": false,
    "message": "You don't have permission to create events."
}
```

```json
{
    "success": false,
    "message": "Registration end date must be after registration start date."
}
```

---

# 2. Get Event by ID

```
GET /api/v1/events/:eventId
```

### Request

```
GET /api/v1/events/6890dc2a44fd9d6db4dcb812
```

### Success Response

```json
{
  "success": true,
  "message": "Event fetched successfully.",
  "data": {
    "_id": "6890dc2a44fd9d6db4dcb812",
    "title": "Google Cloud Study Jam 2027",
    "shortDescription": "Hands-on workshop.",
    "descriptionMarkdown": "# Welcome",
    "category": "Workshop",
    "visibility": "PUBLIC",
    "status": "REGISTRATION_OPEN",
    "tags": [
      "Cloud",
      "Google"
    ],
    "community": {
      "_id": "688dfe73a4cbad124cdb3d20",
      "CommunityName": "GDG Ranchi"
    },
    "mentors": [],
    "judges": [],
    "partners": [],
    "sponsors": [],
    "tickets": [],
    "timeline": [],
    "venue": {},
    "rules": [],
    "requirements": [],
    "createdAt": "2027-08-12T12:15:11Z"
  }
}
```

Populate

* Community
* Mentors
* Judges
* Sponsors
* Partners

---

# 3. Get All Events

```
GET /api/v1/events
```

### Query Parameters

| Parameter   | Description      |
| ----------- | ---------------- |
| page        | Page number      |
| limit       | Records per page |
| search      | Search title     |
| category    | Event category   |
| status      | Event status     |
| visibility  | PUBLIC / PRIVATE |
| communityId | Community ID     |
| tag         | Filter by tag    |
| sort        | latest, oldest   |

Example

```
GET /api/v1/events?page=1&limit=10&status=LIVE&category=Workshop
```

---

Response

```json
{
  "success": true,
  "message": "Events fetched successfully.",
  "data": [
    {
      "_id": "6890...",
      "title": "Cloud Study Jam"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 125,
    "totalPages": 13
  }
}
```

---

# 4. Get Upcoming Events

```
GET /api/v1/events/upcoming
```

Returns

* Registration Open
* Future Events

---

# 5. Get Past Events

```
GET /api/v1/events/past
```

Returns completed events.

Supports

```
page
limit
communityId
category
year
```

---

# 6. Update Event

```
PATCH /api/v1/events/:eventId
```

Partial update supported.

Example Request

```json
{
    "title":"Updated Cloud Study Jam",
    "shortDescription":"Updated description"
}
```

Response

```json
{
    "success":true,
    "message":"Event updated successfully."
}
```

---

# 7. Publish Event

```
PATCH /api/v1/events/:eventId/publish
```

Changes

```
DRAFT
↓

REGISTRATION_OPEN
```

---

# 8. Cancel Event

```
PATCH /api/v1/events/:eventId/cancel
```

Request

```json
{
    "reason":"Venue unavailable due to maintenance."
}
```

Response

```json
{
    "success":true,
    "message":"Event cancelled successfully."
}
```

---

# 9. Archive Event

```
PATCH /api/v1/events/:eventId/archive
```

Moves completed event to archived state.

---

# 10. Delete Event

```
DELETE /api/v1/events/:eventId
```

Uses **soft delete** by default.

Response

```json
{
    "success":true,
    "message":"Event deleted successfully."
}
```

---

# 11. Clone Event

```
POST /api/v1/events/:eventId/clone
```

Copies

* Basic Information
* Venue
* Timeline
* Tickets
* Rules
* Requirements

Does not copy

* Registrations
* Analytics
* Attendance
* Check-ins

---

# 12. Get Event Dashboard

```
GET /api/v1/events/:eventId/dashboard
```

Returns

```json
{
  "success": true,
  "data": {
    "registrations": 245,
    "ticketsSold": 245,
    "remainingSeats": 55,
    "views": 4620,
    "bookmarks": 310,
    "attendance": 210,
    "checkIns": 198
  }
}
```

---

# 13. Get Event Statistics

```
GET /api/v1/events/:eventId/stats
```

Returns

* Total Registrations
* Ticket Sales
* Attendance Rate
* Check-ins
* Views
* Bookmarks

---

# 14. Search Events

```
GET /api/v1/events/search
```

Supports

```
search
category
tags
communityId
city
country
visibility
status
```

Example

```
GET /api/v1/events/search?search=flutter&category=Workshop
```

---

# 15. Get Event by Slug

```
GET /api/v1/events/slug/:slug
```

Example

```
GET /api/v1/events/slug/google-cloud-study-jam-2027
```

Perfect for frontend routing:

```
/events/google-cloud-study-jam-2027
```

---

## Standard Error Response

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    {
      "field": "title",
      "message": "Title must be between 3 and 150 characters."
    }
  ]
}
```

## Standard Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {},
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 153,
    "totalPages": 8,
    "hasNext": true,
    "hasPrevious": false
  }
}
```
