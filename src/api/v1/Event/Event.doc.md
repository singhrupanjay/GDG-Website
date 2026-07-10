## 📌 Epic: Production-Ready Event Management Module (0 → Production)

### Goal

Build a scalable Event Management System for GDG Ranchi that supports:

* Workshops
* DevFest
* Study Jams
* Cloud Community Days
* Build with AI
* Hackathons
* Meetups
* Bootcamps
* Webinars
* Conferences

The module should handle the complete event lifecycle from draft creation through publication, registration, execution, completion, analytics, and archival.

---

# Phase 1 — Foundation

## Database

### Event Schema

* ✅ Basic Information
* ✅ SEO
* ✅ Venue
* ✅ Tickets
* ✅ Timeline
* ✅ FAQ
* ✅ Prizes
* ✅ Analytics
* ✅ Settings
* ✅ Moderation
* ✅ Soft Delete

Remaining improvements:

* [ ] Event Series support
* [ ] Parent Event
* [ ] Recurring Events
* [ ] External Registration URL
* [ ] Livestream URL
* [ ] Recording URL
* [ ] Certificate Template
* [ ] Feedback Form
* [ ] Cancellation Reason
* [ ] Capacity Management
* [ ] Custom Registration Fields

---

## Event Types

Support

```
Workshop
Meetup
Hackathon
Bootcamp
Conference
DevFest
Study Jam
Cloud Community Day
Build with AI
Webinar
Roadshow
Competition
Networking
```

---

## Categories

```
AI

Cloud

Android

Flutter

Web

Backend

DevOps

Firebase

Machine Learning

Open Source

Career

Design

Cyber Security
```

---

# Phase 2 — Validation

## Create Validation Schema

### Required

* title
* description
* category
* eventType
* venue
* timezone
* dates
* seo.slug

---

### Validate

* URLs
* Dates
* Event Status
* Visibility
* Ticket Dates
* Venue Coordinates
* Timeline
* FAQ
* Prizes
* Sponsor Rewards

---

### Business Rules

* End date > Start date
* Registration closes before event ends
* Registration opens before registration closes
* Ticket quantity ≥ soldCount
* Ticket price ≥ 0
* Prize amount ≥ 0
* GeoJSON validation
* Slug uniqueness

---

# Phase 3 — Service Layer

Implement services:

```
createEvent()

updateEvent()

publishEvent()

duplicateEvent()

cancelEvent()

archiveEvent()

deleteEvent()

restoreEvent()

findById()

findBySlug()

listEvents()

searchEvents()

getUpcomingEvents()

getPastEvents()

getLiveEvents()

getFeaturedEvents()

incrementViews()

registerParticipant()

approveParticipant()

rejectParticipant()

addSpeaker()

removeSpeaker()

addSponsor()

removeSponsor()

generateAnalytics()
```

---

# Phase 4 — Controllers

## Create Event

```
POST /events
```

Creates Draft.

---

## Update Event

```
PATCH /events/:id
```

Partial update.

---

## Publish Event

```
PATCH /events/:id/publish
```

Checks:

* Required fields complete
* Venue exists
* SEO valid
* Timeline valid
* Tickets valid

---

## Cancel Event

```
PATCH /events/:id/cancel
```

Stores:

```
reason

cancelledBy

cancelledAt
```

---

## Archive

```
PATCH /events/:id/archive
```

---

## Delete

Soft delete.

---

## Restore

Restore deleted event.

---

## Duplicate

Creates copy.

---

# Phase 5 — Search APIs

```
GET /events
```

Supports

```
?page=

&limit=

&search=

&sort=

&category=

&eventType=

&status=

&visibility=

&startAfter=

&startBefore=

&community=

&featured=

&online=

&country=

&city=
```

---

# Phase 6 — Event Team

Manage

* Organizers
* Speakers
* Mentors
* Judges
* Hosts
* Volunteers

APIs

```
POST /events/:id/team

PATCH /events/:id/team

DELETE /events/:id/team/:memberId
```

---

# Phase 7 — Partners & Sponsors

Manage

* Title Sponsors
* Gold Sponsors
* Community Partners
* Media Partners
* Knowledge Partners
* Venue Partners

APIs

```
POST /events/:id/partners

DELETE /events/:id/partners/:id

GET /events/:id/partners
```

---

# Phase 8 — Registration

Manage

* Tickets
* Capacity
* Waitlist
* Approvals

Features

* Free ticket
* Paid ticket
* Invite-only
* Approval required

---

# Phase 9 — Analytics

Track

```
Views

Unique Views

Registrations

Check-ins

Attendance %

No Shows

Revenue

Prize Distribution

Certificate Downloads

Feedback Submitted

Live Users

Likes

Shares
```

---

# Phase 10 — Permissions

### Admin

Everything

---

### Organizer

Create

Update

Publish

Cancel

Archive

---

### Event Manager

Manage tickets

Manage timeline

Manage speakers

---

### Volunteer

View

Check-in attendees

---

### Public

View only

---

# Phase 11 — Notifications

Automatically notify on:

* Event Published
* Registration Open
* Registration Closing Soon
* Event Reminder
* Event Started
* Event Completed
* Cancellation
* Ticket Approved
* Waitlist Promotion

Channels

* Email
* Discord
* Push
* WhatsApp (future)

---

# Phase 12 — Background Jobs

Cron jobs

```
Registration opens

Registration closes

Auto Publish

Auto Complete

Auto Archive

Reminder emails

Analytics update
```

---




For your current schema, you don't need 40+ APIs. A production-ready Event module can be covered with around **15–18 essential APIs**.

---

# Phase 13 — Dummy API Requests

## 1. Create Event

```http
POST /api/v1/events
```

### Request

```json
{
  "communityId": "687f7ab45e4d123456789001",
  "title": "Build with AI Ranchi 2026",
  "subtitle": "Hands-on AI Workshop",
  "shortDescription": "Learn Generative AI with Google Experts.",
  "descriptionMarkdown": "# Welcome to Build with AI...",
  "seo": {
    "metaTitle": "Build with AI Ranchi 2026",
    "metaDescription": "Official Build with AI Event",
    "keywords": ["AI", "Gemini", "Google"],
    "slug": "build-with-ai-ranchi-2026"
  },
  "category": "AI",
  "eventType": "Workshop",
  "visibility": "PUBLIC",
  "timezone": "Asia/Kolkata",
  "startAt": "2026-08-15T09:00:00Z",
  "endAt": "2026-08-15T17:00:00Z",
  "venue": {
    "mode": "OFFLINE",
    "venueName": "Auditorium",
    "city": "Ranchi",
    "state": "Jharkhand",
    "country": "India"
  }
}
```

### Response

```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "_id": "687f7ab45e4d123456789999",
    "status": "DRAFT"
  }
}
```

---

# 2. Get Event By ID

```http
GET /api/v1/events/:id
```

Response

```json
{
  "success": true,
  "data": {
    "_id": "687f7ab45e4d123456789999",
    "title": "Build with AI Ranchi 2026",
    "status": "PUBLISHED"
  }
}
```

---

# 3. Get All Events

```http
GET /api/v1/events?page=1&limit=10
```

Response

```json
{
  "success": true,
  "data": {
    "events": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 56,
      "pages": 6
    }
  }
}
```

---

# 4. Search Events

```http
GET /api/v1/events?search=AI
```

Supports

```
search
category
eventType
status
visibility
```

---

# 5. Update Event

```http
PATCH /api/v1/events/:id
```

Request

```json
{
  "title": "Build with AI Ranchi 2026 Updated",
  "subtitle": "Advanced AI Workshop"
}
```

---

# 6. Publish Event

```http
PATCH /api/v1/events/:id/publish
```

Response

```json
{
  "success": true,
  "message": "Event published successfully"
}
```

---

# 7. Cancel Event

```http
PATCH /api/v1/events/:id/cancel
```

Request

```json
{
  "reason": "Venue unavailable"
}
```

---

# 8. Archive Event

```http
PATCH /api/v1/events/:id/archive
```

---

# 9. Delete Event

```http
DELETE /api/v1/events/:id
```

Soft Delete

---

# 10. Restore Event

```http
PATCH /api/v1/events/:id/restore
```

---

# 11. Add Event Team

```http
PATCH /api/v1/events/:id/team
```

Request

```json
{
  "organizers": [
    "687f7ab45e4d123456789111"
  ],
  "speakers": [
    "687f7ab45e4d123456789112"
  ],
  "mentors": [
    "687f7ab45e4d123456789113"
  ],
  "judges": [
    "687f7ab45e4d123456789114"
  ],
  "hosts": [
    "687f7ab45e4d123456789115"
  ],
  "volunteers": [
    "687f7ab45e4d123456789116"
  ]
}
```

---

# 12. Add Partners & Sponsors

```http
PATCH /api/v1/events/:id/partners
```

Request

```json
{
  "partners": [
    "687f7ab45e4d123456789201"
  ],
  "sponsors": [
    "687f7ab45e4d123456789202"
  ]
}
```

---

# 13. Update Tickets

```http
PATCH /api/v1/events/:id/tickets
```

Request

```json
[
  {
    "name": "General Pass",
    "type": "FREE",
    "price": 0,
    "quantity": 300,
    "maxPerUser": 1
  }
]
```

---

# 14. Update Timeline

```http
PATCH /api/v1/events/:id/timeline
```

Request

```json
[
  {
    "title": "Registration",
    "description": "Participant Check-in",
    "startAt": "2026-08-15T08:30:00Z",
    "endAt": "2026-08-15T09:30:00Z"
  }
]
```

---

# 15. Update FAQs

```http
PATCH /api/v1/events/:id/faqs
```

Request

```json
[
  {
    "question": "Is this event free?",
    "answer": "Yes"
  }
]
```

---

# 16. Update Prizes

```http
PATCH /api/v1/events/:id/prizes
```

Request

```json
{
  "mainPrizes": [
    {
      "title": "Winner",
      "amount": 50000,
      "currency": "INR"
    }
  ]
}
```

---

# 17. Event Analytics

```http
GET /api/v1/events/:id/analytics
```

Response

```json
{
  "success": true,
  "data": {
    "viewsCount": 15420,
    "uniqueViewsCount": 12031,
    "registrationsCount": 520,
    "attendeesCount": 481,
    "teamsCount": 78,
    "likesCount": 840,
    "sharesCount": 225
  }
}
```

---

# 18. Duplicate Event

```http
POST /api/v1/events/:id/duplicate
```

Response

```json
{
  "success": true,
  "message": "Event duplicated successfully",
  "data": {
    "_id": "687f7ab45e4d123456789777",
    "status": "DRAFT"
  }
}
```

## Common Query Parameters

```http
GET /api/v1/events?
page=1&
limit=10&
search=AI&
category=AI&
eventType=Workshop&
status=PUBLISHED&
visibility=PUBLIC&
sort=-createdAt&
featured=true
```

## Common Error Response

```json
{
  "success": false,
  "message": "Event not found"
}
```

```json
{
  "success": false,
  "message": "You are not authorized to perform this action"
}
```

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "title": "Title is required",
    "startAt": "Start date is required"
  }
}
```




---

# Phase 14 — Testing

## Schema

* Required fields
* Defaults
* Enums
* GeoJSON
* Dates
* Soft delete
* Indexes

---

## Validation

* Invalid URLs
* Invalid dates
* Invalid venue
* Invalid ticket
* Invalid prize
* Duplicate slug

---

## Services

Every service method

---

## Controllers

Every endpoint

---

## Authorization

Every role

---

## Integration

* Event ↔ Members
* Event ↔ Partners
* Event ↔ Registration
* Event ↔ Tickets
* Event ↔ Timeline

---

## Edge Cases

* Duplicate slug
* Overlapping event times
* Capacity exceeded
* Registration after close
* Event cancellation with attendees
* Speaker removed after publication
* Sponsor removed after rewards assigned
* Invalid GeoJSON
* Concurrent ticket purchases
* Soft-deleted event access

---

# Phase 15 — Documentation

* OpenAPI / Swagger
* Postman Collection
* Event lifecycle diagram
* Database ER diagram
* Sequence diagrams
* Permission matrix
* Validation rules
* Error catalog
* Seed data
* Deployment guide
* Monitoring and logging guide

---

## Definition of Done

The module is considered complete when it provides:

* Production-ready schema with lifecycle management.
* Full CRUD and lifecycle APIs (publish, cancel, archive, restore, duplicate).
* Role-based authorization and organization/community isolation.
* Search, filtering, sorting, pagination, and SEO-friendly lookup.
* Ticketing, registration, speakers, mentors, judges, partners, sponsors, timeline, venue, FAQs, and prizes fully integrated.
* Analytics, notifications, scheduled jobs, and audit logging.
* Comprehensive unit, integration, and end-to-end tests.
* Complete API documentation and developer guides.

This implementation plan is suitable for scaling from a single GDG chapter to a multi-community platform hosting thousands of events annually.
