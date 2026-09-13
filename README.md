# GDG Ranchi Backend API

A robust, feature-rich Node.js backend designed to power the GDG (Google Developer Groups) platform. Built with a modular, scalable architecture, this backend handles everything from user authentication and RBAC permissions to event management, ticketing, and media galleries.

## 🚀 Key Features

* **Authentication & Authorization**: Secure JWT-based authentication, OTP verification, and highly granular Role-Based Access Control (RBAC) via a custom Permissions engine.
* **Community & Member Management**: Manage user profiles, community onboarding, roles, and member directories.
* **Event & Ticket Management**: Complete event lifecycle management including timelines, venues, ticketing, prizes, and attendee registrations.
* **Media & Galleries**: Album creation and management tied to events. Supports adding, updating, and removing images using Cloudinary for asset storage.
* **Partners & Sponsors**: Dedicated modules for managing event sponsors, partners, and their respective tiers.
* **Asynchronous Processing**: Integrated RabbitMQ message broker for decoupled processing (e.g., sending emails via Nodemailer, event announcements, and OTPs).

## 🛠️ Tech Stack

* **Runtime/Framework**: Node.js, Express.js, TypeScript (`tsx` for dev)
* **Database**: MongoDB (via Mongoose ODM)
* **Validation & Schema**: Zod
* **Message Broker**: RabbitMQ (`amqplib`)
* **Storage/Media**: Cloudinary, Multer
* **Testing**: Jest, Supertest

## 📁 Project Structure

The project follows a **Feature-based architecture** under `src/api/v1/`. Each feature module contains its own controllers, services, routes, schemas, and documentation.

```text
src/
├── api/v1/
│   ├── Auth/             # Authentication, JWT, OTPs
│   ├── Community/        # Community groups and profiles
│   ├── Event/            # Event creation and timelines
│   ├── EventRegister/    # Attendee registration handling
│   ├── Gallery/          # Event photo albums
│   ├── Member/           # User/Member profiles and roles
│   ├── Permission/       # RBAC and access control
│   └── ... (Partners, Tickets, Venues, etc.)
├── constant/             # Global constants and environment schemas
├── infrastructure/       # DB connections, RabbitMQ setup
├── utils/                # Global utilities (Email, Cloudinary, Response Wrapper)
├── routes/               # Main API router aggregator
└── app.ts / server.ts    # Express App and Server entry points
```

## ⚙️ Setup & Installation

### Prerequisites
* Node.js (v18+)
* MongoDB Instance (Local or Atlas)
* RabbitMQ Server
* Cloudinary Account (for image uploads)

### 1. Clone & Install
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory and populate it based on `.env.example`:
```env
PORT=3000
FRONTEND_URL=http://localhost:5173
MONGO_URI=mongodb://localhost:27017/gdg-ranchi
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RABBITMQ_URL=amqp://localhost
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
NODE_ENV=development
```
*(Note: The app contains fallback validations and will run a mock environment if critical variables are missing, ensuring you can still boot the server without a full setup.)*

### 3. Run the Server
```bash
# Development mode (with live reload via tsx)
npm run dev

# Production build & run
npm run build
npm start
```

## 📚 API Documentation

Detailed API documentation for individual modules can be found within their respective directories as Markdown files (e.g., `src/api/v1/Gallery/Gallery.doc.md`).

**Health Check Endpoint:**
* `GET /` - Returns `{"message": "server is Runing , .."}`
* `GET /api/v1/health` - Returns `{"status": "UP"}`
