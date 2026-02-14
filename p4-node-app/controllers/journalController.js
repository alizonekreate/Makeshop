import Journal from "../models/journalModel.js";

export const createJournal = async (req, res) => {
    try {
        const journal = await Journal.create({ userId: req.userId, content: req.body.content });
        res.status(201).json(journal);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const getJournals = async (req, res) => {
    try {
        const journals = await Journal.find({ userId: req.userId, deleted: false });
        res.json(journals);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const deleteJournal = async (req, res) => {
    try {
        await Journal.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, { deleted: true });
        res.json({ message: "Journal deleted" });
    } catch (err) { res.status(500).json({ error: err.message }); }
};
