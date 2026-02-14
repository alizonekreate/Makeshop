import Habit from "../models/habitModel.js";

export const createHabit = async (req, res) => {
    try {
        const habit = await Habit.create({ userId: req.userId, content: req.body.content });
        res.status(201).json(habit);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const getHabits = async (req, res) => {
    try {
        const habits = await Habit.find({ userId: req.userId, deleted: false });
        res.json(habits);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const deleteHabit = async (req, res) => {
    try {
        await Habit.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, { deleted: true });
        res.json({ message: "Habit deleted" });
    } catch (err) { res.status(500).json({ error: err.message }); }
};
