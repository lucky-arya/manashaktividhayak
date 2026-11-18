# Fest Yuva Nirman / Manashakti Vidhayak Hackathon Portal

A modern, full-stack web application and registration portal for the **Fest Yuva Nirman / Manashakti Vidhayak Hackathon 2025**.

This repository contains the complete frontend landing page, interactive problem statement browser, participant registration system, and a robust Express.js + MongoDB backend API.

---

## 📐 Tech Stack & Framework Architecture

### Frontend
- **HTML5 & Vanilla CSS3**: Highly optimized, modern UI featuring custom typographic styling (`Nohemi` font family), custom scrollbars, animations, and glassmorphism styling.
- **Vanilla JavaScript (ES6+)**: Interactive widgets, section scroll handling, modal/filter controls, and dynamic async `fetch` integration with the backend API.
- **Environment Detection**: Automatic base URL resolution (`localhost` vs Vercel Production) via `getApiUrl()`.

### Backend
- **Node.js & Express.js**: RESTful web API service handling user registrations, health monitoring, and administrative analytics.
- **MongoDB & Mongoose**: Object Data Modeling (ODM) with custom virtual fields, indexes, validation middleware, and pre-save duplicate email prevention.
- **Security & Optimization**:
  - `helmet`: Security headers
  - `cors`: Configurable cross-origin resource sharing
  - `express-rate-limit`: Prevents abuse and brute-force submissions (100 reqs per 15 min per IP)
  - `express-validator`: Server-side payload validation and sanitization

### Deployment & Serverless
- **Vercel Integration**: Serverless function setup (`backend/api/index.js` and `backend/vercel.json`) allowing seamless deployment to Vercel.

---

## 📁 Repository Directory Structure

```
vidhayak2026/
├── assets/                          # Static media assets & web fonts
│   ├── favicons/                    # Web application favicons & manifest
│   ├── Fest Yuva Nirmaan Logo.webp  # Event graphic asset
│   ├── Logo Manashakti .png         # Organization logo
│   ├── Nohemi-*.ttf / .otf          # Custom font binaries (Regular, Medium, SemiBold, Bold)
│   └── qr-code.jpg                  # QR code image asset
├── backend/                         # Node.js + Express.js API Server
│   ├── api/                         # Vercel serverless function entrypoint
│   │   └── index.js
│   ├── config/                      # Database connection setup
│   │   └── database.js              # Mongoose connection loader
│   ├── models/                      # Mongoose schemas
│   │   └── Registration.js          # Hackathon registration schema & virtuals
│   ├── routes/                      # API router controllers
│   │   └── registrations.js         # POST/GET registration endpoints & validation
│   ├── .env.example                 # Example environment variables template
│   ├── package.json                 # Node dependencies and scripts
│   ├── server.js                    # Core Express app & local server initializer
│   ├── test-api.js                  # Automated API test script
│   └── vercel.json                  # Vercel deployment configuration
├── config.js                        # Frontend API configuration auto-detector
├── index.html                       # Main landing page & registration UI
├── Guidlines.md                     # Code of conduct, rules & venue guidelines
├── Problem Statements 2025.md       # Full documentation of Hackathon Problem Statements (PS1-PS7)
├── Manashakti Hackathon 2025 (1).md # Detailed hackathon event overview document
└── start-backend.bat                # Windows quick-start batch script for backend
```

---

## ⚡ Quick Start & Local Development

### 1. Prerequisites
- **Node.js**: v16.x or higher
- **npm**: v8.x or higher
- **MongoDB**: Local MongoDB instance (`mongodb://localhost:27017`) OR a MongoDB Atlas cluster URI.

### 2. Setting Up the Backend

1. Navigate into the backend directory:
   ```bash
   cd backend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Configure `.env` values:
   ```env
   MONGODB_URI=mongodb://localhost:27017/fest-yuva-nirman
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://127.0.0.1:5500
   ```
5. Start the backend development server (with `nodemon` auto-reload):
   ```bash
   npm run dev
   ```
   *Alternatively, on Windows, double-click or run `start-backend.bat` from the repository root.*

### 3. Setting Up the Frontend

1. Open `index.html` using **Live Server** (VS Code extension) or any static file server:
   ```bash
   # Example using npx serve
   npx serve .
   ```
2. By default, `index.html` detects `localhost` or `127.0.0.1` and automatically points API requests to `http://localhost:5000`.

---

## 📡 API Endpoint Reference

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | API Root Documentation & Endpoint Summary | Public |
| `GET` | `/api/health` | Server Health Status & Timestamp | Public |
| `POST` | `/api/registrations` | Register a new team for the hackathon | Public |
| `GET` | `/api/registrations` | Fetch paginated registrations list (`?page=1&limit=10`) | Admin |
| `GET` | `/api/registrations/:id` | Fetch single registration details by ID | Admin |
| `GET` | `/api/registrations/admin/stats` | Fetch aggregate stats (total teams, by PS, by size) | Admin |

### Sample Payload for `POST /api/registrations`

```json
{
  "teamName": "Cyber Knights",
  "teamLeader": "Aarav Sharma",
  "email": "aarav.sharma@example.com",
  "phone": "+919876543210",
  "teamSize": 4,
  "problemChoice": "ps1",
  "problemTitle": "Website UI/UX - The \"Clutter\" Problem"
}
```

---

## 🛠 Developer Guide: Navigating & Making Changes

### 1. Modifying Problem Statements
- **Frontend Presentation**: Edit the problem statement cards in [index.html](file:///Users/admin/Desktop/vidhayak2026/index.html).
- **Backend Enums & Virtuals**: If adding or updating problem statements, update the `enum` array and `problemMap` dictionary in [backend/models/Registration.js](file:///Users/admin/Desktop/vidhayak2026/backend/models/Registration.js) and the validation rules in [backend/routes/registrations.js](file:///Users/admin/Desktop/vidhayak2026/backend/routes/registrations.js).

### 2. Updating Registration Validation Rules
- Payload validation rules use `express-validator` inside [backend/routes/registrations.js](file:///Users/admin/Desktop/vidhayak2026/backend/routes/registrations.js). Modify regex patterns for `phone`, length limits for `teamName`, or `teamSize` limits there.

### 3. Modifying Backend API Base URL
- Frontend auto-detects localhost vs production in [index.html](file:///Users/admin/Desktop/vidhayak2026/index.html#L3486) within the `getApiUrl()` function, as well as in [config.js](file:///Users/admin/Desktop/vidhayak2026/config.js).
- Update the `PRODUCTION` URL string in `config.js` or `getApiUrl()` once the backend is deployed to Vercel/Render/Railway.

### 4. Running Backend API Tests
- Run the automated test script to verify API connectivity and registration endpoints:
  ```bash
  cd backend
  node test-api.js
  ```

---

## 🚀 Deployment Instructions

### Backend Deployment (Vercel)
1. Install Vercel CLI or connect your GitHub repository to Vercel.
2. Set `Root Directory` in Vercel settings to `backend`.
3. Add Environment Variables in Vercel Dashboard:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: `production`
   - `CLIENT_URL`: Your deployed frontend URL
4. Deploy using command:
   ```bash
   vercel --prod
   ```

### Frontend Deployment
- The frontend consists of static files (`index.html`, `config.js`, `assets/`). It can be hosted directly on GitHub Pages, Vercel, Netlify, or Cloudflare Pages.

---

## 📜 Problem Statements Summary

| ID | Title | Domain |
| :--- | :--- | :--- |
| **PS1** | Website UI/UX - The "Clutter" Problem | Digital Experience |
| **PS2** | Manatarang App UI/UX - The "Ease" Problem | Mobile App Design |
| **PS3** | Magazine Subscription - The "Conversion" Problem | Marketing & UX |
| **PS4** | Suggested Methods - The "Impact Tracking" Problem | Data & Analytics |
| **PS5** | Manashakti Wisdom - The "Discovery" Problem | Content Search |
| **PS6** | Seeding Success - The "Retention" Problem | User Engagement |
| **PS7** | Mind Gym - The "Engagement" Problem | Gamification |

For full problem statement descriptions, refer to [Problem Statements 2025.md](file:///Users/admin/Desktop/vidhayak2026/Problem%20Statements%202025.md) and [Guidlines.md](file:///Users/admin/Desktop/vidhayak2026/Guidlines.md).
