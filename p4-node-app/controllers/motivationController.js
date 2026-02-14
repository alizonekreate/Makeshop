import Motivation from "../models/motivationModel.js";

export const getMotivationByJournal = async (req, res) => {
    try {
        const motivations = await Motivation.find({ journalId: req.params.journalId });
        res.json(motivations);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const createMotivation = async (req, res) => {
    try {
        const motivation = await Motivation.create({ journalId: req.body.journalId, text: req.body.text });
        res.status(201).json(motivation);
    } catch (err) { res.status(500).json({ error: err.message }); }
};
