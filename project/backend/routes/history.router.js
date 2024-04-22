const express = require("express");
const router = express.Router();
const HistoryModel = require("../models/history.server.model");

// setup endpoint get all history
router.get("/", async (req, res) => {
  try {
    const histories = await HistoryModel.find();
    res.json(histories);
  } catch (err) {
    res.json({ message: err });
  }
});

// setup endpoint get history by id
router.get("/:id", getHistory, (req, res) => {
  res.json(res.history);
});

// setup endpoint create history
router.post("/", async (req, res) => {
  const history = new HistoryModel({
    problem: req.body.problem,
    user: req.user,
    submission: req.body.submission,
  });
  try {
    const newHistory = await history.save();
    res.status(201).json(newHistory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint update history
router.patch("/:id", getHistory, async (req, res) => {
  if (req.body.problem != null) {
    res.history.problem = req.body.problem;
  }
  if (req.body.user != null) {
    res.history.user = req.body.user;
  }
  if (req.body.submission != null) {
    res.history.submission = req.body.submission;
  }
  try {
    const updatedHistory = await res.history.save();
    res.json(updatedHistory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint delete history
router.delete("/:id", getHistory, async (req, res) => {
  try {
    await res.history.remove();
    res.json({ message: "Deleted history" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// delete all history
router.delete("/", async (req, res) => {
  try {
    await HistoryModel.deleteMany();
    res.json({ message: "Deleted all history" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// middleware function to get history by id
async function getHistory(req, res, next) {
  let history;
  try {
    history = await HistoryModel.findById(req.params.id);
    if (history == null) {
      return res.status(404).json({ message: "Cannot find history" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.history = history;
  next();
}

module.exports = router;
