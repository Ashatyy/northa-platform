# Northa Group Unified Enterprise Resource & Service Booking Platform

**Author:** Aisha Sani Ibrahim  
**Student ID:** 100079  

## 🏢 Overview
Multi-industry conglomerates operating across diverse economic sectors often suffer from severe operational fragmentation due to siloed, manual, and disconnected service booking workflows. This cloud-native management system serves as a central operational hub for **Northa Group**, addressing these inefficiencies across its Construction, Oil & Gas, Agriculture, and Hospitality divisions. 

The platform replaces highly siloed, spreadsheet-based processes with an integrated, highly optimized full-stack web application designed for B2B clientele and internal administrative efficiency.

## 🛠️ Technical Architecture & Novelty
This project differentiates itself from standard single-purpose booking websites through several innovative software engineering approaches:
- **Polymorphic Multi-Industry Data Architecture:** Combines strict ACID relational integrity (PostgreSQL) with flexible `JSONB` schema validation (Prisma). This allows four fundamentally different industries to share a single unified booking and reporting core.
- **Framework:** Next.js 15 (App Router, Server Actions)
- **Authentication:** Supabase SSR Auth (Optimized with instantaneous JWT session checks)
- **UI Design System:** Modern Enterprise B2B Interface (Tailwind CSS, clean typography, highly responsive)
- **Deployment:** Railway (via Docker containerization)

---

## 🔄 Business Logic & Application Flow

### 1. Client Booking Management Portal
- Clients access a unified self-service dashboard to browse the **Service Catalog** across all divisions.
- Thanks to the **Dynamic Form Engine**, the system automatically renders the required fields based on the Service's stored JSON schema.
- Clients can view detailed booking specifications, monitor live status updates, inspect their historical audit trail, and instantly **cancel pending requests**.

### 2. Admin Review & Lifecycle Management
- Administrators intercept `PENDING` requests via the Service Bookings dashboard.
- Admins can open any request to view dynamically parsed **Service Requirements** (transforming raw JSON payloads into clean, readable text).
- The Admin manages the state-driven lifecycle by updating statuses (`CONFIRMED`, `COMPLETED`, `CANCELLED`, `DECLINED`).

### 3. Administrative Resource & Schedule Management
- **Automated Conflict Detection:** When allocating resources, the system mathematically verifies staff availability. Overlapping personnel assignments and double-bookings are automatically blocked before confirmation.
- All staff assignments are instantly written to the centralized **Staff Scheduling** matrix, which is sorted by *Recently Created* for immediate administrative verification.
- **Asset Tracking:** Admins can also register and track physical resources (e.g., excavators, drones) using the Resource Management module.

### 4. State-Driven Tracking & In-App Notification System
- Enforces deterministic booking lifecycle transitions coupled with Next.js **Server Actions and Optimistic UI**. 
- This architecture achieves the exact live telemetry of WebSockets without the overhead—triggering instant in-app alerts and unread notification badges for both clients and staff as statuses change or schedules are assigned.

### 5. Cross-Divisional Analytics
- An executive reporting module (`/dashboard/metrics`) provides unified statistical reports on booking volumes and operational trends across all four business sectors.

---

## ⚡ Extreme Performance Optimizations
During development, significant architectural tuning was performed to achieve enterprise-grade speed:
1. **Zero-Latency Authentication Routing:** By migrating from blocking `getUser()` network calls to instantaneous `getSession()` cookie validation in the Next.js Middleware and UI Layouts, we eliminated all cross-region HTTP latency during page navigation. (Sensitive Server Actions strictly maintain `getUser()` for data mutation).
2. **Layout Render Decoupling:** Removed heavy Database `upsert` locks and redundant `count()` queries from the dashboard's root layout. Next.js Server Actions now resolve instantly without triggering cascading DB writes on every re-render.

---

## 🚀 Setup Instructions

### 1. Environment Variables
Create a `.env` file in the root directory:
```env
# Supabase PostgreSQL Connection URL
DATABASE_URL="postgresql://user:password@host:port/postgres?schema=public"
DIRECT_URL="postgresql://user:password@host:port/postgres?schema=public"

# Supabase Auth
NEXT_PUBLIC_SUPABASE_URL="https://your-project-url.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

### 2. Local Development
```bash
# Install dependencies
npm install

# Push database schema to Supabase
npx prisma db push

# Generate Prisma Client types
npx prisma generate

# Run the development server
npm run dev
```

### 3. Deployment to Railway
The project contains a heavily optimized `Dockerfile` and `railway.json`. Simply connect your GitHub repository to Railway and it will automatically detect the configuration, build the Next.js standalone server, and deploy it smoothly.

---
*Built as a computer software engineering project addressing advancements in enterprise resource architecture.*
