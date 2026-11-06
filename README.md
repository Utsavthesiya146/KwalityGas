# Kwality Gas – Website Revamp & Dynamic CMS

A modernized, high-performance, dynamic corporate web application for **Kwality Gas Bottlers Private Limited** (`https://kwalitygas.com/`).

Rebuilt from the ground up using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **MySQL with Prisma ORM**, this project revamps the user experience while preserving 100% of the authentic company content, historical milestones, product specifications, safety procedures, pricing, and 31 original URLs.

---

## 1. Technology Stack

- **Frontend:** Next.js (App Router), React 18, Tailwind CSS, Lucide React Icons, Framer Motion
- **Backend:** Next.js Server Components, Server Actions & Route Handlers
- **Database:** MySQL with Prisma ORM
- **Authentication:** Secure Admin authentication with bcrypt password hashing and HTTP-only JWT sessions
- **Image Architecture:** 86 authentic audited assets preserved in `/public/images/original/` with support for Cloudinary / persistent cloud storage.
- **Deployment Compatibility:** Hostinger Cloud Node.js Hosting & Vercel ready.

---

## 2. Default Admin Credentials

- **Admin URL:** `/admin`
- **Default Login Email:** `admin@kwalitygas.com`
- **Default Password:** `KwalityAdmin@2026`

---

## 3. Key Dynamic CMS Capabilities

1. **Live State Price List Management:**
   - Update Karnataka & Tamil Nadu LPG rates dynamically.
   - Edit effective dates, WEF notices, and statutory GST condition notes.
   - Changes reflect immediately on public `/price-list` without redeploying code.
2. **Multi-Channel Enquiry Management:**
   - Domestic Home Customer submissions
   - Commercial HORECA establishment requirements
   - Industrial 33kg bulk cylinder requirements
   - Real-time status workflow (`NEW`, `IN_PROGRESS`, `CONTACTED`, `RESOLVED`, `CLOSED`) and internal staff notes.
3. **Product & Cylinder Catalog:**
   - Full CRUD for cylinders, gas water heaters, and safety accessories.
   - Segment flags (Domestic, Commercial, Industrial).
4. **Testimonials & Social Proof:**
   - Full CRUD for client reviews with verified badges and authentic customer photos.
5. **SEO & Open Graph Control:**
   - Per-page meta title, description, and keywords management.

---

## 4. Complete 31 URL Migration & 301 Redirect Mapping

| Original Crawled URL | Target Revamped Route | Status |
|---|---|---|
| `https://kwalitygas.com/` | `/` | Core Modern Homepage |
| `/index.html` / `index.php` | `/` | 301 Permanent Redirect |
| `/about.html` / `about-us.html` | `/about` | Core About Us Page |
| `/products.html` | `/products` | Core Products Page |
| `/cylinders.html` | `/cylinders` | Dedicated Cylinders Range |
| `/domestic.html` | `/domestic` | Domestic Portal |
| `/commercial.html` | `/commercial` | Commercial (HORECA) Portal |
| `/industrial.html` | `/industrial` | Industrial Solutions Portal |
| `/service.html` / `service` | `/services` | 4 Service Pillars |
| `/price-list.php` / `.html` | `/price-list` | Dynamic Price Table |
| `/safty-features.html` | `/safety-features` | Certified Safety Procedures |
| `/testimonials.html` | `/testimonials` | 8 Verified Customer Stories |
| `/group-company.html` | `/group-company` | The Bangalore Tin Works |
| `/gallery.html` | `/gallery` | Categorized Photo Gallery |
| `/contact.html` | `/contact` | Domestic Customer Contact |
| `/contact1.html` | `/contact/commercial` | Commercial Requirement Form |
| `/contact2.html` | `/contact/industrial` | Industrial Requirement Form |
| `/privacy-policy.html` | `/privacy-policy` | Data Protection Policy |
| `/404.html` | `not-found.tsx` | Branded Error Page |
| Template demos (`blog.html`, `project.html`, etc.) | Safely redirected | Clean 301 Redirects in `next.config.mjs` |

---

## 5. Local Setup & Database Instructions

### Prerequisites
- Node.js 18+ (tested on Node v24)
- MySQL Server (e.g. XAMPP, MariaDB, or standard MySQL 8.x)

### Steps:
1. Clone / navigate to workspace:
   ```bash
   cd "d:\Kwality Gas"
   ```
2. Configure `.env` file:
   ```env
   DATABASE_URL="mysql://root:@localhost:3306/kwality_gas_db"
   JWT_SECRET="your-secure-jwt-secret-key"
   ADMIN_SESSION_NAME="kwality_admin_session"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Push Prisma schema to MySQL:
   ```bash
   npx prisma db push
   ```
5. Seed authentic audited company data:
   ```bash
   npm run db:seed
   ```
6. Start development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## 6. Hostinger Cloud Node.js Deployment Guide

1. In Hostinger hPanel, create a **Node.js Application** (Node 18 or 20 LTS).
2. Set the Application root and entry point:
   - Application root: `public_html` or `/var/www/kwalitygas`
   - Startup command: `npm start`
3. Create a **MySQL Database** in Hostinger hPanel and copy credentials into `.env`:
   ```env
   DATABASE_URL="mysql://u123456789_user:StrongPassword@localhost:3306/u123456789_kwality_gas"
   ```
4. Build the application:
   ```bash
   npm run build
   npx prisma db push
   npm run db:seed
   ```
5. Restart the Node.js application in Hostinger dashboard.

