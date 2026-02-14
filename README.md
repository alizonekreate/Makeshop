📘 Anchora App

Anchora is a full-stack productivity application that allows users to:
Register and Login securely
Manage Tasks (Pending / Done)
Track Habits (Habits can generate Tasks)
Write Journal entries
Automatically generate Motivation from Journal entries
Perform full CRUD operations
Use RESTful API
Test endpoints via Postman and Jest + Supertest

🚀 Tech Stack

Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
bcrypt (password hashing)
dotenv
cors
helmet
Jest
Supertest
Frontend
HTML
CSS (Mobile Friendly)
Vanilla JavaScript
Fetch API

📂 Project Structure

p4-node-app
│
├── controllers/
│   ├── authController.js
│   ├── taskController.js
│   ├── habitController.js
│   ├── journalController.js
│   └── motivationController.js
│
├── models/
│   ├── userModel.js
│   ├── taskModel.js
│   ├── habitModel.js
│   ├── journalModel.js
│   └── motivationModel.js
│
├── routes/
│   ├── authRoutes.js
│   ├── taskRoutes.js
│   ├── habitRoutes.js
│   ├── journalRoutes.js
│   └── motivationRoutes.js
│
├── middleware/
│   └── authMiddleware.js
│
├── db.js
├── app.js
├── index.js
├── .env
├── tests/
│   └── api.test.js
└── README.md

🛠 Setup Instructions

1️⃣ Install Dependencies

npm install

If missing:
npm install bcrypt jsonwebtoken

2️⃣ Create .env File

PORT=5000
MONGO_URI=mongodb://localhost:27017/anchora
JWT_SECRET=supersecretkey
NODE_ENV=development

3️⃣ Run Server

npm run dev
Server should show:
MongoDB connected!
Server running on port 5000

🔐 Authentication Flow

User registers → Password hashed using bcrypt
User logs in → JWT token generated
Token sent in headers:
Authorization: Bearer <token>
Protected routes use auth middleware

📌 API Endpoints

🔑 Auth

Action	URL	Method	Description
Register	/api/auth/register	POST	Create new user
Login	/api/auth/login	POST	Authenticate user

✅ Tasks

Action	URL	Method	CRUD
Create Task	/api/tasks	POST	Create
Get Tasks	/api/tasks	GET	Read
Update Task	/api/tasks/:id	PUT	Update
Delete Task	/api/tasks/:id	DELETE	Soft Delete
Features:
Task has pending and done status
Small toggle button in frontend
Soft deletion (isDeleted: true)

🔁 Habits

Action	URL	Method
Create Habit	/api/habits	POST
Get Habits	/api/habits	GET
Delete Habit	/api/habits/:id	DELETE
Feature:
When a habit is created, it can automatically generate a Task using habitId reference.

📓 Journal

Action	URL	Method
Create Journal	/api/journal	POST
Get Journals	/api/journal	GET

💡 Motivation

Action	URL	Method
Get Motivation by Journal	/api/motivation/:journalId	GET
Feature:
Motivation is dynamically generated from Journal entries.

🧠 Database Design

User
username
email
password (hashed)
Task
content
done (boolean)
habitId (optional reference)
isDeleted (soft delete)
Habit
content
userId
Journal
content
userId
Motivation
text
journalId

🧪 Testing (Jest + Supertest)

Run tests:
npm test
Tests include:
Register user
Login user
Create Task
Get Tasks
Protected routes validation

🔄 REST Compliance

Uses proper HTTP verbs (GET, POST, PUT, DELETE)
Uses proper status codes (200, 201, 400, 401, 404, 500)
Uses JSON responses
Implements soft deletion
Has optional query parameters support

🛡 Security

Password hashing (bcrypt)
JWT Authentication
Helmet for security headers
CORS enabled
Environment variables using dotenv

📱 Frontend Flow

Register
Login
Dashboard appears
User can:
Add Task
Toggle Done / Pending (small side button)
Delete Task
Add Habit
Add Journal
Automatically fetch Motivation
Logout

📌 Technical Requirements Met

✔ Express
✔ dotenv
✔ cors
✔ helmet
✔ Minimum 4 endpoints
✔ Full CRUD operations
✔ Soft deletion
✔ Optional query parameter
✔ Proper error handling
✔ RESTful API
✔ Jest & Supertest tests

🎯 Future Improvements

AI-based motivation
Habit streak tracking
Date-based task filtering
Dashboard analytics
UI enhancement (modern design)

👩‍💻 Author

Alison Kate Lachica
Anchora App – Full Stack Productivity System