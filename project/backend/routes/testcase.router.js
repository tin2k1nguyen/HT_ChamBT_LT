const express = require("express");
const router = express.Router();
const TestCaseModel = require("../models/testcase.server.model");

// setup endpoint get all testcase
router.get("/", async (req, res) => {
  try {
    const testcases = await TestCaseModel.find();
    res.json(testcases);
  } catch (err) {
    res.json({ message: err });
  }
});

// setup endpoint get a testcase
router.get("/:id", getTestCase, (req, res) => {
  res.json(res.testcase);
});

// setup endpoint create a testcase
router.post("/", async (req, res) => {
  const testcase = new TestCaseModel({
    input: req.body.input,
    output: req.body.output,
    problem: req.body.problem,
  });
  try {
    const newTestCase = await testcase.save();
    res.status(201).json(newTestCase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint update a testcase
router.patch("/:id", getTestCase, async (req, res) => {
  if (req.body.input != null) {
    res.testcase.input = req.body.input;
  }
  if (req.body.output != null) {
    res.testcase.output = req.body.output;
  }
  try {
    const updatedTestCase = await res.testcase.save();
    res.json(updatedTestCase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint delete a testcase
router.delete("/:id", getTestCase, async (req, res) => {
  try {
    await res.testcase.remove();
    res.json({ message: "Deleted testcase" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getTestCase(req, res, next) {
  let testcase;
  try {
    testcase = await TestCaseModel.findById(req.params.id);
    if (testcase == null) {
      return res.status(404).json({ message: "Cannot find testcase" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.testcase = testcase;
  next();
}

module.exports = router;
