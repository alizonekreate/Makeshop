import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import dotenv from "dotenv";
dotenv.config();

let token;
let taskId;
let habitId;
let journalId;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Anchora API", () => {
    it("Register user", async () => {
        const res = await request(app).post("/api/auth/register").send({
            username: "testusername",
            email: "test@examplee.com",
            password: "1234567"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("userId");
    });

    it("Login user", async () => {
        const res = await request(app).post("/api/auth/login").send({
            username: "testuser",
            password: "123456"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
        token = res.body.token;
    });

    it("Create task", async () => {
        const res = await request(app).post("/api/tasks")
            .set("Authorization", `Bearer ${token}`)
            .send({ content: "My test task" });
        expect(res.statusCode).toBe(201);
        taskId = res.body._id;
    });

    it("Get tasks", async () => {
        const res = await request(app).get("/api/tasks")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("Delete task", async () => {
        const res = await request(app).delete(`/api/tasks/${taskId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    });

    it("Create habit", async () => {
        const res = await request(app).post("/api/habits")
            .set("Authorization", `Bearer ${token}`)
            .send({ content: "My test habit" });
        expect(res.statusCode).toBe(201);
        habitId = res.body._id;
    });

    it("Delete habit", async () => {
        const res = await request(app).delete(`/api/habits/${habitId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    });

    it("Create journal", async () => {
        const res = await request(app).post("/api/journal")
            .set("Authorization", `Bearer ${token}`)
            .send({ content: "My journal" });
        expect(res.statusCode).toBe(201);
        journalId = res.body._id;
    });

    it("Create motivation", async () => {
        const res = await request(app).post("/api/motivation")
            .set("Authorization", `Bearer ${token}`)
            .send({ journalId, text: "You can do it!" });
        expect(res.statusCode).toBe(201);
    });
});
