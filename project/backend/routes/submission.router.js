const express = require("express");
const router = express.Router();
const SubmissionModel = require("../models/submission.server.model");
const HistoryModel = require("../models/history.server.model");
const UserModel = require("../models/user.server.model");
const TestcaseModel = require("../models/testcase.server.model");
const ProblemModel = require("../models/problem.server.model");
const request = require("request");
const {
  prepareToSendJudge,
  prepareToGetResultJudge,
} = require("./compile.router");

// setup endpoint get all submission
router.get("/", (req, res) => {
  try {
    const submissions = SubmissionModel.find({}, (err, submissions) => {
      var opts = [
        { path: "problem", select: "title  -_id" },
        // { path: "user", select: "name  -_id" },
      ];
      const data = [];
      var promises = SubmissionModel.populate(submissions, opts)
        .then((sub) => {
          data.push(sub);
        })
        .then(() => {
          res.json(data.flat());
        });
      console.log(promises);
    }).sort({ date: -1 });
  } catch (err) {
    res.json({ message: err });
  }
});

// setup endpoint get submission by id
router.get("/:id", getSubmission, (req, res) => {
  res.json(res.submission);
});

// setup endpoint create submission
router.post("/", async (req, res) => {
  const submission = new SubmissionModel({
    ...req.body,
  });
  try {
    const newSubmission = await submission.save();
    // get all testcase of problem
    const testcases = await TestcaseModel.find({
      problem: req.body.problem,
    });
    // send submission for each testcase and create history
    for (let i = 0; i < testcases.length; i++) {
      const testcase = testcases[i];
      const options = prepareToSendJudge({
        language: req.body.language,
        code: req.body.code,
        input: testcase.input,
        save: false,
      });
      console.log(1);
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        const submissionResult = JSON.parse(body);
        console.log(2);
        // loop until status == "SUCCESS"
        let check = false;
        setTimeout(() => {
          request(
            prepareToGetResultJudge(submissionResult.id),
            function (error, response, body) {
              console.log(3);
              if (error) throw new Error(error);
              const resp = JSON.parse(body);
              if (resp.status == "SUCCESS") {
                console.log(resp);
                const history = new HistoryModel({
                  submission: newSubmission._id,
                  testcase: testcase._id,
                  output: resp.output.length > 0 ? resp.output : resp.rntError,
                  status: resp.output.length > 0 ? 1 : 2,
                  time: resp.time,
                  memory: resp.memory,
                });
                history.save();
                check = true;
              }
            }
          );
        }, 15000);
      });
    }
    res.status(201).json(newSubmission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint update submission
router.patch("/:id", getSubmission, async (req, res) => {
  if (req.body.code != null) {
    res.submission.code = req.body.code;
  }
  if (req.body.language != null) {
    res.submission.language = req.body.language;
  }
  if (req.body.problem != null) {
    res.submission.problem = req.body.problem;
  }

  if (req.body.input != null) {
    res.submission.input = req.body.input;
  }
  try {
    const updatedSubmission = await res.submission.save();
    res.json(updatedSubmission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint delete submission
router.delete("/:id", getSubmission, async (req, res) => {
  try {
    await res.submission.remove();
    res.json({ message: "Deleted Submission" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get all history of submission
router.get("/:id/history", async (req, res) => {
  try {
    const histories = await HistoryModel.find({
      submission: req.params.id,
    }).populate({
      path: "testcase",
      select: "input output -_id",
    });
    res.json(histories);
  } catch (err) {
    res.json({ message: err });
  }
});

async function getSubmission(req, res, next) {
  let submission;
  try {
    submission = await SubmissionModel.findById(req.params.id);
    if (submission == null) {
      return res.status(404).json({ message: "Cannot find submission" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.submission = submission;
  next();
}

module.exports = router;
