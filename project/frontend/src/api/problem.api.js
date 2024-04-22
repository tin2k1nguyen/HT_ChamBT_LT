import config from "./config";

const ProblemApi = {
  // get all problems
  getAllProblems: (payload) => config.get("/problem"),
  // get problem by id
  getProblemById: (problemId) => {
    return config.get(`/problem/${problemId}`);
  },
  // create problem
  createProblem: (problem) => {
    return config.post("/problem", { ...problem });
  },
  // update problem
  updateProblem: (problemId, problem) => {
    return config.patch(`/problem/${problemId}`, { ...problem });
  },
  // delete problem
  deleteProblem: (problemId) => {
    return config.delete(`/problem/${problemId}`);
  },
  // get all submissions of a problem
  getAllSubmissionsOfProblem: (problemId) => {
    return config.get(`/problem/${problemId}/submissions`);
  },
  // get all submissions of a problem
  getSubmissionOfProblem: (problemId, submissionId) => {
    return config.get(`/problem/${problemId}/submissions/${submissionId}`);
  },
  // create submission of a problem
  createSubmissionOfProblem: (problemId, submission) => {
    return config.post(`/problem/${problemId}/submissions`, { ...submission });
  },
  // update submission of a problem
  updateSubmissionOfProblem: (problemId, submissionId, submission) => {
    return config.patch(`/problem/${problemId}/submissions/${submissionId}`, {
      ...submission,
    });
  },
  // delete submission of a problem
  deleteSubmissionOfProblem: (problemId, submissionId) => {
    return config.delete(`/problem/${problemId}/submissions/${submissionId}`);
  },
  // get all testcases of a problem
  getAllTestcasesOfProblem: (problemId) => {
    return config.get(`/problem/${problemId}/testcases`);
  },
  // get testcase of a problem
  getTestcaseOfProblem: (problemId, testcaseId) => {
    return config.get(`/problem/${problemId}/testcases/${testcaseId}`);
  },
  // create testcase of a problem
  createTestcaseOfProblem: (problemId, testcase) => {
    return config.post(`/problem/${problemId}/testcases`, { ...testcase });
  },
  // update testcase of a problem
  updateTestcaseOfProblem: (problemId, testcaseId, testcase) => {
    return config.patch(`/problem/${problemId}/testcases/${testcaseId}`, {
      ...testcase,
    });
  },
  // delete testcase of a problem
  deleteTestcaseOfProblem: (problemId, testcaseId) => {
    return config.delete(`/problem/${problemId}/testcases/${testcaseId}`);
  },
};

export default ProblemApi;
