Anchora Backend (Express + MongoDB)
Setup
Install:
npm install
Add .env:
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/anchora_db
NODE_ENV=development
Run:
npm run dev

Tech Specs Checklist
express ✅
dotenv ✅
cors ✅
helmet ✅
4+ endpoints ✅
CRUD ✅ (Tasks endpoints)
Optional query param ✅ (GET /api/tasks?status=...&search=...&date=...)
Soft delete ✅ (isDeleted flag)
Error handling ✅

Endpoints
Tasks
POST /api/tasks
GET /api/tasks?userId=...&date=YYYY-MM-DD&status=done&search=water
PATCH /api/tasks/:id
DELETE /api/tasks/:id (soft delete)

Habits
POST /api/habits
GET /api/habits?userId=...
DELETE /api/habits/:id (soft delete)

Motivations
GET /api/motivations/today?userId=...&type=bible|advice

Notes
Habits auto-generate daily habit-tasks when you call GET /api/tasks with a date.
intervalDays=1 daily, 2 every other day, etc.