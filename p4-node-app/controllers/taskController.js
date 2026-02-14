import Task from "../models/taskModel.js";

export const createTask = async (req, res) => {
    try {
        const task = await Task.create({ userId: req.userId, content: req.body.content });
        res.status(201).json(task);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.userId, deleted: false });
        res.json(tasks);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            req.body,
            { new: true }
        );
        res.json(task);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const deleteTask = async (req, res) => {
    try {
        await Task.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, { deleted: true });
        res.json({ message: "Task deleted" });
    } catch (err) { res.status(500).json({ error: err.message }); }
};
