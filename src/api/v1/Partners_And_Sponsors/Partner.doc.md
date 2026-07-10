# Partner & Sponsor Module — Complete Implementation Plan (0 → Production)

## Objective

Build a **production-grade Partner & Sponsor Management Module** that enables GDG Ranchi (and future organizations) to manage companies, sponsorships, partnerships, event associations, contracts, analytics, and permissions through a scalable architecture.

The module should support everything from a local workshop with one sponsor to a large-scale DevFest with dozens of sponsors, media partners, hiring partners, and community partners.

---

# Architecture

```
Partner Module
│
├── Partner Schema
├── Validation
├── Service Layer
├── Controller
├── Routes
├── Permissions
├── Search
├── Filters
├── Pagination
├── Analytics
├── Event Mapping
├── Soft Delete
├── Audit Logs
├── Tests
└── API Documentation
```

---

# Folder Structure

```
Partner/
│
├── Partner.Schema.ts
├── Partner.Type.ts
├── Partner.Validation.ts
├── Partner.Service.ts
├── Partner.Controller.ts
├── Partner.Route.ts
├── Partner.Constant.ts
├── Partner.Permission.ts
├── Partner.Interface.ts
├── Partner.Utils.ts
│
├── dto/
│
│   ├── CreatePartner.dto.ts
│   ├── UpdatePartner.dto.ts
│   ├── SearchPartner.dto.ts
│
├── middleware/
│
├── tests/
│
│   ├── schema.test.ts
│   ├── validation.test.ts
│   ├── service.test.ts
│   ├── controller.test.ts
│   └── integration.test.ts
```

---

# Database Schema

## Basic Information

| Field          | Type     | Required |
| -------------- | -------- | -------- |
| organizationId | ObjectId | ✅        |
| companyName    | String   | ✅        |
| shortName      | String   | ❌        |
| slug           | String   | ✅        |
| description    | String   | ❌        |
| industry       | String   | ❌        |
| website        | URL      | ❌        |
| companyLogo    | URL      | ✅        |
| bannerImage    | URL      | ❌        |

---

## Classification

```
relationshipType

Sponsor

Partner
```

```
tier

Title

Platinum

Gold

Silver

Bronze

Community

Knowledge

Media

Hiring

Venue

Startup

Ecosystem

Other
```

```
status

Pending

Active

Inactive

Rejected

Completed
```

---

# Contact Information

```
contact

name

designation

email

phone
```

---

# Social Links

```
linkedin

twitter

github

facebook

instagram

youtube
```

---

# Sponsorship

```
amount

currency

benefits[]

deliverables[]

contractSigned

contractStartDate

contractEndDate

paymentStatus
```

---

# Event Mapping

```
events[]

ObjectId
```

---

# Analytics

```
totalContribution

sponsoredEvents

websiteClicks

registrationsGenerated

eventReach
```

---

# Internal

```
notes

createdBy

updatedBy

verified

verifiedAt

isDeleted

deletedAt
```

---

# APIs

---

## Create Partner

```
POST /api/v1/partners
```

### Request

```json
{
  "organizationId": "66e3b98d91a91b2f7b100111",
  "companyName": "Google",
  "shortName": "Google",
  "description": "Technology Company",
  "relationshipType": "Sponsor",
  "tier": "Title",
  "website": "https://google.com",
  "companyLogo": "https://cdn.example.com/google.png",
  "industry": "Technology",
  "contact": {
    "name": "John Doe",
    "designation": "Developer Relations",
    "email": "john@google.com",
    "phone": "+91XXXXXXXXXX"
  }
}
```

---

### Response

```json
{
  "success": true,
  "message": "Partner created successfully",
  "data": {
    "_id": "...",
    "companyName": "Google",
    "relationshipType": "Sponsor",
    "tier": "Title"
  }
}
```

---

# Get Partner

```
GET /partners/:id
```

---

Response

```json
{
  "success": true,
  "data": {
    "_id": "...",
    "companyName": "Google",
    "website": "https://google.com"
  }
}
```

---

# Update Partner

```
PATCH /partners/:id
```

---

Request

```json
{
  "tier": "Platinum",
  "status": "Active"
}
```

---

# Delete Partner

```
DELETE /partners/:id
```

Soft Delete

---

# Restore

```
PATCH /partners/:id/restore
```

---

# List Partners

```
GET /partners
```

Supports

```
?page=

&limit=

&search=

&sort=

&tier=

&relationshipType=

&status=

&industry=
```

---

# Search

Supports

```
Google

Microsoft

Technology

Media

Gold

Sponsor

Partner
```

---

# Sorting

Supports

```
companyName

createdAt

updatedAt

tier

amount
```

---

# Pagination

```
?page=1

&limit=20
```

---

# Population

Supports

```
events

createdBy

updatedBy

organization
```

---

# Validation

Validate

✅ Required fields

✅ URLs

✅ Email

✅ Phone

✅ Enums

✅ Duplicate Company

✅ Duplicate Website

✅ Sponsorship Amount

✅ Contract Dates

---

# Business Rules

Company name unique per organization

Slug auto-generated

Cannot delete active contract

Cannot create duplicate slug

Soft delete only

Restore available

Cross organization access denied

---

# Permissions

Admin

Can do everything

---

Organizer

Create

Update

Read

Cannot Delete

---

Finance

Update sponsorship

Payment

Contract

---

Volunteer

Read only

---

Public

Read only active partners

---

# Services

```
createPartner()

updatePartner()

deletePartner()

restorePartner()

getPartner()

listPartners()

searchPartners()

changeStatus()

changeTier()

verifyPartner()

linkEvent()

unlinkEvent()

analytics()
```

---

# Controller

```
POST

GET

PATCH

DELETE

RESTORE

SEARCH

LIST
```

---

# Events Integration

```
Event

↓

Partners[]

↓

Partner

↓

Analytics
```

---

# Search Pipeline

```
Search

↓

Filters

↓

Sorting

↓

Pagination

↓

Population

↓

Response
```

---

# Database Indexes

```
organizationId

companyName

slug

tier

status

relationshipType

website
```

Compound

```
organizationId + companyName

organizationId + tier

organizationId + status
```

Text

```
companyName

description
```

---

# Error Responses

```json
{
  "success": false,
  "message": "Company already exists"
}
```

```json
{
  "success": false,
  "message": "Partner not found"
}
```

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

```json
{
  "success": false,
  "message": "Invalid organization"
}
```

---

# Dummy Seed Data

```json
[
  {
    "companyName": "Google",
    "relationshipType": "Sponsor",
    "tier": "Title",
    "status": "Active",
    "industry": "Technology"
  },
  {
    "companyName": "GitHub",
    "relationshipType": "Partner",
    "tier": "Community",
    "status": "Active",
    "industry": "Developer Platform"
  },
  {
    "companyName": "JetBrains",
    "relationshipType": "Sponsor",
    "tier": "Gold",
    "status": "Active",
    "industry": "Software"
  },
  {
    "companyName": "Postman",
    "relationshipType": "Partner",
    "tier": "Knowledge",
    "status": "Active",
    "industry": "API Platform"
  }
]
```

---

# Testing Checklist

## Schema

* Required fields
* Default values
* Enums
* Unique indexes
* Soft delete

## Validation

* Invalid email
* Invalid URL
* Missing required fields
* Duplicate company
* Invalid enums

## Services

* Create
* Update
* Delete
* Restore
* Search
* Filter
* Pagination
* Event linking

## Controllers

* All CRUD endpoints
* Authorization
* Validation errors
* Business rule enforcement

## Integration

* Organization isolation
* Event ↔ Partner association
* Soft delete lifecycle
* Permission checks

## Performance

* Search under large datasets
* Pagination efficiency
* Index utilization
* Concurrent update handling

---

# Definition of Done

* Complete Partner schema with audit fields and soft delete.
* Validation layer covering all inputs and business rules.
* Full CRUD API with search, filter, sort, pagination, and population.
* Organization-scoped authorization and data isolation.
* Event association and sponsorship lifecycle management.
* API documentation (OpenAPI/Swagger) and Postman collection.
* Comprehensive unit, integration, and edge-case tests.
* Seed data for development and QA.
* Production-ready logging, error handling, and monitoring hooks.
