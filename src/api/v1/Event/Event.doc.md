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
  "communityId": "6a5515e619178aff73262707",
  "title": "Ranchi Hacks 2027",
  "shortDescription": "48-hour national hackathon to build innovative solutions using AI, Web, Cloud, and Open Source technologies.",
  "descriptionMarkdown": "# 🚀 Welcome to Ranchi Hacks 2027\n\nRanchi Hacks is Jharkhand's flagship community-driven hackathon where students, developers, designers, and innovators collaborate to solve real-world problems.\n\n## What to Expect\n- 💻 48 Hours of Coding\n- 🤖 AI & Machine Learning\n- ☁️ Google Cloud & Firebase\n- 🌐 Full Stack Development\n- 📱 Mobile App Development\n- 🎮 Open Innovation Challenges\n- 🎤 Mentor Sessions\n- 🏆 Exciting Prizes & Swags\n- 🤝 Networking with Industry Experts\n\nWhether you're a beginner or an experienced developer, Ranchi Hacks provides the perfect platform to learn, build, and showcase your innovation.",
  "redirectUrl": "https://ranchihacks.dev",
  "tags": [
    "Hackathon",
    "AI",
    "Web",
    "Cloud",
    "Open Source",
    "Flutter",
    "Firebase",
    "Google Cloud",
    "Innovation",
    "Startup"
  ],
  "category": "Hackathon",
  "visibility": "PUBLIC",
  "status": "REGISTRATION_OPEN",
  "coverImageUrl": "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/ranchi%20hacks%20bevy_U4ksO2S.png",
  "introVideoUrl": "https://www.youtube.com/embed/DW8x5-Pc5NI?si=ZxDKeDjy3NPfqhze",
  "registrationStartAt": "2027-09-01T09:00:00Z",
  "registrationEndAt": "2027-09-25T23:59:59Z",
  "venue": {
    "mode": "OFFLINE",
    "venueName": "BIT Mesra",
    "address": "BIT Mesra Campus",
    "city": "Ranchi",
    "state": "Jharkhand",
    "country": "India",
    "latitude": 23.4165,
    "longitude": 85.4406
  },
  "timeline": [
    {
      "title": "Registration Opens",
      "startAt": "2027-09-01T09:00:00Z",
      "endAt": "2027-09-25T23:59:59Z"
    },
    {
      "title": "Shortlisting Announcement",
      "startAt": "2027-09-28T18:00:00Z",
      "endAt": "2027-09-28T19:00:00Z"
    },
    {
      "title": "Participant Check-in",
      "startAt": "2027-10-01T08:00:00Z",
      "endAt": "2027-10-01T09:30:00Z"
    },
    {
      "title": "Opening Ceremony",
      "startAt": "2027-10-01T10:00:00Z",
      "endAt": "2027-10-01T11:00:00Z"
    },
    {
      "title": "Hackathon Begins",
      "startAt": "2027-10-01T11:00:00Z",
      "endAt": "2027-10-03T11:00:00Z"
    },
    {
      "title": "Mentoring Sessions",
      "startAt": "2027-10-02T10:00:00Z",
      "endAt": "2027-10-02T18:00:00Z"
    },
    {
      "title": "Project Submission Deadline",
      "startAt": "2027-10-03T11:00:00Z",
      "endAt": "2027-10-03T11:30:00Z"
    },
    {
      "title": "Final Demo & Judging",
      "startAt": "2027-10-03T12:00:00Z",
      "endAt": "2027-10-03T16:00:00Z"
    },
    {
      "title": "Closing Ceremony & Prize Distribution",
      "startAt": "2027-10-03T17:00:00Z",
      "endAt": "2027-10-03T18:30:00Z"
    }
  ],
  "rules": [
    "Each team must have 2 to 5 members.",
    "Participants must carry a valid college or government-issued ID.",
    "All code must be developed during the hackathon.",
    "Use of open-source libraries is permitted.",
    "Plagiarism or copied projects will result in immediate disqualification.",
    "Projects submitted after the deadline will not be evaluated.",
    "Participants are responsible for their own laptops and chargers.",
    "Teams must follow the event code of conduct.",
    "Judges' decisions will be final and binding.",
    "Internet access will be provided throughout the event."
  ],
  "requirements": [
    "Laptop with charger",
    "Government or College ID Card",
    "Basic knowledge of programming",
    "Git & GitHub account",
    "Team of 2-5 members",
    "Enthusiasm to build innovative solutions"
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

- Community must exist.
- User must belong to the community.
- Only Organizer/Admin can create events.
- Registration end date must be after start date.
- Event title should be unique within the same community.
- Maximum 20 tags.
- Maximum 50 timeline entries.

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
    "tags": ["Cloud", "Google"],
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

- Community
- Mentors
- Judges
- Sponsors
- Partners

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

- Registration Open
- Future Events

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

# 📘 Update Event API Documentation

## Endpoint

```http
PATCH /api/v1/events/:Slug
```

### Description

Updates an existing event. Only the fields provided in the request body will be updated. All other fields remain unchanged.

---

## Authentication

**Required**

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## Path Parameters

| Parameter | Type     | Required | Description                         |
| --------- | -------- | -------- | ----------------------------------- |
| `Slug`    | `string` | ✅ Yes   | Unique slug of the event to update. |

### Example

```http
PATCH /api/v1/event/update/open-source-hackathon-2026
```

---

## Request Headers

```http
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>
```

---

## Request Body (Example)

> You only need to send the fields you want to update.

```json
{
  "title": "AI Innovation Summit 2026",
  "shortDescription": "A one-day summit focused on Artificial Intelligence, Machine Learning, and Generative AI.",
  "descriptionMarkdown": "# 🤖 AI Innovation Summit 2026\n\nJoin AI researchers, industry experts, and developers for a full-day event covering the latest advancements in Artificial Intelligence, LLMs, Robotics, and AI-powered applications.",
  "redirectUrl": "https://example.com/events/ai-innovation-summit-2026",
  "category": "Conference",
  "visibility": "PUBLIC",
  "status": "REGISTRATION_CLOSED",
  "coverImageUrl": "https://images.example.com/events/ai-summit-banner.jpg",
  "introVideoUrl": "https://www.youtube.com/embed/aqz-KE-bpKQ",
  "registrationStartAt": "2026-08-01T09:00:00.000Z",
  "registrationEndAt": "2026-09-05T23:59:59.000Z",
  "tags": [
    "AI",
    "Machine Learning",
    "Generative AI",
    "LLM",
    "Cloud",
    "Technology"
  ],

  "rules": [
    "Carry a valid ID proof.",
    "Complete registration before the deadline.",
    "Follow the event code of conduct."
  ]
}
```

---

## Successful Response (200 OK)

```json
{
  "success": true,
  "message": "Event Updated Successfully",
  "data": {
    "_id": "6a55bdafc4a80708f25f3966",
    "Slug": "break-the-pattern-9c80f7d9",
    "communityId": "6a5515e619178aff73262707",
    "createdBy": "6a54a4d9f9ac87469c5786fd",
    "title": "AI Innovation Summit 2026",
    "shortDescription": "A one-day summit focused on Artificial Intelligence, Machine Learning, and Generative AI.",
    "descriptionMarkdown": "# 🤖 AI Innovation Summit 2026\n\nJoin AI researchers, industry experts, and developers for a full-day event covering the latest advancements in Artificial Intelligence, LLMs, Robotics, and AI-powered applications.",
    "redirectUrl": "https://example.com/events/ai-innovation-summit-2026",
    "tags": [
      "AI",
      "Machine Learning",
      "Generative AI",
      "LLM",
      "Cloud",
      "Technology"
    ],
    "category": "Conference",
    "visibility": "PUBLIC",
    "status": "REGISTRATION_CLOSED",
    "coverImageUrl": "https://images.example.com/events/ai-summit-banner.jpg",
    "introVideoUrl": "https://www.youtube.com/embed/aqz-KE-bpKQ",
    "registrationStartAt": "2026-08-01T09:00:00.000Z",
    "registrationEndAt": "2026-09-05T23:59:59.000Z",
    "venue": {
      "mode": "OFFLINE",
      "venueName": "BIT Mesra",
      "address": "BIT Mesra Campus",
      "city": "Ranchi",
      "state": "Jharkhand",
      "country": "India"
    },
    "mentors": [],
    "judges": [],
    "partners": [],
    "sponsors": [],
    "tickets": [
      {
        "name": "General Admission",
        "type": "FREE",
        "description": "Free workshop access for all registered participants.",
        "price": 0,
        "currency": "INR",
        "isActive": false,
        "_id": "6a55bdafc4a80708f25f3967",
        "createdAt": "2026-07-14T04:40:15.468Z",
        "updatedAt": "2026-07-14T04:40:15.468Z"
      }
    ],
    "timeline": [
      {
        "title": "Registration Opens",
        "description": "",
        "startAt": "2026-02-20T09:00:00.000Z",
        "endAt": "2026-03-12T23:59:59.000Z",
        "_id": "6a55bdafc4a80708f25f3968"
      },
      {
        "title": "Participant Check-in",
        "description": "",
        "startAt": "2026-03-14T08:30:00.000Z",
        "endAt": "2026-03-14T09:30:00.000Z",
        "_id": "6a55bdafc4a80708f25f3969"
      },
      {
        "title": "Opening Session",
        "description": "",
        "startAt": "2026-03-14T10:00:00.000Z",
        "endAt": "2026-03-14T10:30:00.000Z",
        "_id": "6a55bdafc4a80708f25f396a"
      },
      {
        "title": "DSA Workshop",
        "description": "",
        "startAt": "2026-03-14T10:30:00.000Z",
        "endAt": "2026-03-14T13:00:00.000Z",
        "_id": "6a55bdafc4a80708f25f396b"
      },
      {
        "title": "Live Coding & Interview Session",
        "description": "",
        "startAt": "2026-03-14T14:00:00.000Z",
        "endAt": "2026-03-14T16:30:00.000Z",
        "_id": "6a55bdafc4a80708f25f396c"
      },
      {
        "title": "Q&A and Closing Ceremony",
        "description": "",
        "startAt": "2026-03-14T16:30:00.000Z",
        "endAt": "2026-03-14T17:30:00.000Z",
        "_id": "6a55bdafc4a80708f25f396d"
      }
    ],
    "rules": [
      "Carry a valid ID proof.",
      "Complete registration before the deadline.",
      "Follow the event code of conduct."
    ],
    "requirements": [
      "Laptop",
      "Government or College ID",
      "Basic programming knowledge",
      "Code editor installed",
      "Interest in Data Structures & Algorithms"
    ],
    "createdAt": "2026-07-14T04:40:15.468Z",
    "updatedAt": "2026-07-16T14:27:33.734Z"
  }
}
```

---

## Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "message": "Event slug is required and cannot be empty"
}
```

---

### 403 Forbidden

```json
{
  "success": false,
  "message": "Forbidden: You don't have permission to update event"
}
```

---

### 404 Not Found

```json
{
  "success": false,
  "message": "Failed to Find Event"
}
```

---

### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Failed to update event"
}
```

---

## Notes

- Authentication is required.
- User must have the `UPDATE_EVENT` permission.
- The event is identified by its `Slug`.
- Only the fields included in the request body are updated.
- Fields not sent in the request remain unchanged.
- Validation is performed before updating the event.

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
  "reason": "Venue unavailable due to maintenance."
}
```

Response

```json
{
  "success": true,
  "message": "Event cancelled successfully."
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
  "success": true,
  "message": "Event deleted successfully."
}
```

---

# 11. Clone Event

```
POST /api/v1/events/:eventId/clone
```

Copies

- Basic Information
- Venue
- Timeline
- Tickets
- Rules
- Requirements

Does not copy

- Registrations
- Analytics
- Attendance
- Check-ins

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

- Total Registrations
- Ticket Sales
- Attendance Rate
- Check-ins
- Views
- Bookmarks

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
