# 🚀 Zerops Deployment Guide & Learning Platform for Freshers

A modern, full-stack educational web application designed to guide freshers and junior developers through deploying web applications onto the **Zerops platform** step-by-step.

---

## 🌟 Key Features

1. **5-Step Master Deployment Guide**:
   - Zerops architecture & isolated VPC concepts explained simply.
   - Creating services, setting up `zerops.yml`, and setting up GitHub CI/CD or `zcli` deployment.
   - Interactive progress tracker that saves completed steps locally.

2. **Tech Stack Recipes (Blueprints)**:
   - **React + Vite** (Static Nginx container with zero server overhead).
   - **Node.js Express / NestJS** (REST API with unauthenticated health checks & port binding).
   - **Python FastAPI & Django** (ASGI Uvicorn with isolated virtualenvs).
   - **Next.js Fullstack** (Standalone mode with SSR and Server Actions).
   - **Go Gin / Fiber** (Ultra-fast binary builds).
   - **PostgreSQL & Redis Managed Services** (Internal VPC networking & automated backups).

3. **Visual `zerops.yml` Generator & Validator**:
   - Customize runtime, commands, build caches, and ports visually.
   - Live YAML validation alerting to common syntax errors, missing HTTP support, or unoptimized cache blocks.
   - 1-click copy & `.yml` download.

4. **Common Mistakes & Fixes Library (Fresher Pitfalls)**:
   - Side-by-side comparison of Wrong Code vs. Correct Code.
   - Diagnoses:
     - ⚠️ Binding to `127.0.0.1` instead of `0.0.0.0`
     - ⚠️ Single Page App 404 error on page refresh
     - ⚠️ Hardcoded `localhost` database connections
     - ⚠️ Slow 10-minute builds from missing cache blocks
     - ⚠️ Mismatched service hostnames in `zerops.yml`
     - ⚠️ Health checks failing due to middleware authentication

5. **Interactive `zcli` Terminal Simulator**:
   - Practice CLI commands (`zcli login`, `zcli service push`, `zcli service status`, `zcli service log`) in an interactive web terminal.

6. **Fresher Readiness Quiz**:
   - 6 interactive knowledge questions testing core concepts with instant scoring and badge rewards.

7. **Developer Cheatsheet & Advice Board**:
   - Quick reference for Zerops dynamic environment variables (`${db_hostname}`, `${db_user}`) and community tip submissions.

---

## 📁 Project Structure

```
Zerops_deploy/
├── backend/
│   ├── src/
│   │   ├── data/
│   │   │   ├── guides.json          # Step-by-step guides & conceptual foundations
│   │   │   ├── pitfalls.json        # Database of rookie deployment errors & fixes
│   │   │   ├── recipes.json         # Stack blueprints (React, Node, Python, etc.)
│   │   │   └── quiz.json            # Readiness assessment questions
│   │   ├── routes/
│   │   │   ├── guidesRoutes.js      # Guide & stack endpoints
│   │   │   ├── configRoutes.js      # Dynamic zerops.yml generation & validation
│   │   │   ├── pitfallsRoutes.js    # Pitfalls and error diagnosis
│   │   │   ├── quizRoutes.js        # Quiz validation and scoring
│   │   │   └── tipsRoutes.js        # Community tips & bookmarking
│   │   ├── server.js                # Express app entry point (listening on 0.0.0.0:5000)
│   │   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/              # React components (Navbar, Hero, Generator, etc.)
│   │   ├── services/api.js          # REST client to connect with backend
│   │   ├── App.jsx                  # Main dashboard controller
│   │   ├── index.css                # Glassmorphic Tailwind styling tokens
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── zerops.yml                       # Production Zerops deployment file for this app
```

---

## 💻 Local Development Setup

### 1. Start the Backend API
```bash
cd backend
npm install
npm start
# API runs on http://localhost:5000
```

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:3000
```
