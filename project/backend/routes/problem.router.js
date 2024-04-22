const express = require("express");
const ProblemModel = require("../models/problem.server.model");
const TestCaseModel = require("../models/testcase.server.model");
const SubmissionModel = require("../models/submission.server.model");
const HistoryModel = require("../models/history.server.model");
const UserModel = require("../models/user.server.model");
const router = express.Router();

// setup endpoint get all problem
router.get("/", async (req, res) => {
  try {
    const problems = await ProblemModel.find();
    res.json(problems);
  } catch (err) {
    res.json({ message: err });
  }
});

// setup endpoint get problem by id
router.get("/:id", getProblem, (req, res) => {
  res.json(res.problem);
});

// setup endpoint create problem
router.post("/", async (req, res) => {
  const problem = new ProblemModel({
    title: req.body.title,
    description: req.body.description,
    user: req.user,
  });
  try {
    const newProblem = await problem.save();
    res.status(201).json(newProblem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint update problem
router.patch("/:id", getProblem, async (req, res) => {
  if (req.body.title != null) {
    res.problem.title = req.body.title;
  }
  if (req.body.description != null) {
    res.problem.description = req.body.description;
  }
  try {
    const updatedProblem = await res.problem.save();
    res.json(updatedProblem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint delete problem
router.delete("/:id", getProblem, async (req, res) => {
  try {
    await res.problem.remove();
    res.json({ message: "Deleted Problem" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// setup endpoint get all test cases of a problem
router.get("/:id/testcases", getProblem, async (req, res) => {
  try {
    const testcases = await TestCaseModel.find({ problem: res.problem._id });
    res.json(testcases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// setup endpoint get a test case of a problem
router.get(
  "/:id/testcases/:testcaseId",
  getProblem,
  getTestCase,
  (req, res) => {
    res.json(res.testcase);
  }
);

// setup endpoint create a test case of a problem
router.post("/:id/testcases", getProblem, async (req, res) => {
  const testcase = new TestCaseModel({
    input: req.body.input,
    output: req.body.output,
    problem: res.problem._id,
  });
  try {
    const newTestCase = await testcase.save();
    res.status(201).json(newTestCase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint update a test case of a problem
router.patch(
  "/:id/testcases/:testcaseId",
  getProblem,
  getTestCase,
  async (req, res) => {
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
  }
);

// setup endpoint delete a test case of a problem
router.delete(
  "/:id/testcases/:testcaseId",
  getProblem,
  getTestCase,
  async (req, res) => {
    try {
      await res.testcase.remove();
      res.json({ message: "Deleted TestCase" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// setup endpoint get all submissions of a problem
router.get("/:id/submissions", getProblem, async (req, res) => {
  try {
    const submissions = await SubmissionModel.find({
      problem: res.problem._id,
    });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// setup endpoint get a submission of a problem
router.get(
  "/:id/submissions/:submissionId",
  getProblem,
  getSubmission,
  (req, res) => {
    user: res.json(res.submission);
  }
);

// setup endpoint create a submission of a problem

router.post("/:id/submissions", getProblem, async (req, res) => {
  const submission = new SubmissionModel({
    code: req.body.code,
    language: req.body.language,
    problem: res.problem._id,
    user: req.user,
  });
  try {
    const newSubmission = await submission.save();
    res.status(201).json(newSubmission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint update a submission of a problem
router.patch(
  "/:id/submissions/:submissionId",
  getProblem,
  getSubmission,
  async (req, res) => {
    if (req.body.code != null) {
      res.submission.code = req.body.code;
    }
    if (req.body.language != null) {
      res.submission.language = req.body.language;
    }
    try {
      const updatedSubmission = await res.submission.save();
      res.json(updatedSubmission);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// setup endpoint delete a submission of a problem
router.delete(
  "/:id/submissions/:submissionId",
  getProblem,
  getSubmission,
  async (req, res) => {
    try {
      await res.submission.remove();
      res.json({ message: "Deleted Submission" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// setup endpoint get all history of submissions of a problem
router.get(
  "/:id/submissions/:submissionId/history",
  getProblem,
  getSubmission,
  async (req, res) => {
    try {
      const histories = await HistoryModel.find({
        submission: res.submission._id,
      });
      res.json(histories);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// setup endpoint get a history of submissions of a problem
router.get(
  "/:id/submissions/:submissionId/history/:historyId",
  getProblem,
  getSubmission,
  getHistory,
  (req, res) => {
    res.json(res.history);
  }
);

// setup endpoint create a history of submissions of a problem
router.post(
  "/:id/submissions/:submissionId/history",
  getProblem,
  getSubmission,
  async (req, res) => {
    const history = new HistoryModel({
      status: req.body.status,
      message: req.body.message,
      submission: res.submission._id,
    });
    try {
      const newHistory = await history.save();
      res.status(201).json(newHistory);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// setup endpoint update a history of submissions of a problem
router.patch(
  "/:id/submissions/:submissionId/history/:historyId",
  getProblem,
  getSubmission,
  getHistory,
  async (req, res) => {
    if (req.body.status != null) {
      res.history.status = req.body.status;
    }

    try {
      const updatedHistory = await res.history.save();
      res.json(updatedHistory);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// setup endpoint delete a history of submissions of a problem
router.delete(
  "/:id/submissions/:submissionId/history/:historyId",
  getProblem,
  getSubmission,
  getHistory,
  async (req, res) => {
    try {
      await res.history.remove();
      res.json({ message: "Deleted History" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

async function getProblem(req, res, next) {
  let problem;
  try {
    problem = await ProblemModel.findById(req.params.id).populate({
      path: "user",
      select: "name -_id",
      model: UserModel,
    });
    if (problem == null) {
      return res.status(404).json({ message: "Cannot find problem" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.problem = problem;
  next();
}

async function getTestCase(req, res, next) {
  let testcase;
  try {
    testcase = await TestCaseModel.findById(req.params.testcaseId);
    if (testcase == null) {
      return res.status(404).json({ message: "Cannot find testcase" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.testcase = testcase;
  next();
}

async function getSubmission(req, res, next) {
  let submission;
  try {
    submission = await SubmissionModel.findById(req.params.submissionId);
    if (submission == null) {
      return res.status(404).json({ message: "Cannot find submission" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.submission = submission;
  next();
}

async function getHistory(req, res, next) {
  let history;
  try {
    history = await HistoryModel.findById(req.params.historyId);
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
