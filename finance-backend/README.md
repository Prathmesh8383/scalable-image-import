# 💰 Finance Backend System

## 🚀 Overview
This project is a backend system for managing financial records with role-based access control and dashboard analytics.

---

## 🛠 Tech Stack
- Node.js
- Express.js
- Prisma ORM
- SQLite

---

## 🔐 Roles
- ADMIN → Full access
- ANALYST → Read + dashboard
- VIEWER → Limited access

---

## 📌 APIs

### Users
- POST /users
- GET /users

### Records
- POST /records
- GET /records
- PUT /records/:id
- DELETE /records/:id

### Dashboard
- GET /dashboard/summary
- GET /dashboard/category

---

## 🔍 Filtering
- /records?type=income
- /records?category=salary
- /records?startDate=2026-04-01&endDate=2026-04-30

---

## ▶️ Run Project

```bash
npm install
npm run dev

Server:  
http://localhost:5000