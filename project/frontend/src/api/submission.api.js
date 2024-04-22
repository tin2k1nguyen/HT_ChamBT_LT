import config from "./config";

export const SubmissionApi = {
  // get all submissions
  getAllSubmissions: (params) => {
    return config.get("/submission", { params });
  },
  // get all submissions of problem
  getAllSubmissionsOfProblem: (problemId) => {
    return config.get(`/submission/problem/${problemId}`);
  },
  // get all submissions of user
  getAllSubmissionsOfUser: (userId) => {
    return config.get(`/submission/user/${userId}`);
  },
  // get submission by id
  getSubmissionById: (submissionId) => {
    return config.get(`/submission/${submissionId}`);
  },
  // create submission
  createSubmission: (data) => {
    return config.post("/submission", data);
  },
  // update submission
  updateSubmission: (submissionId, data) => {
    return config.patch(`/submission/${submissionId}`, data);
  },
  // delete submission
  deleteSubmission: (submissionId) => {
    return config.delete(`/submission/${submissionId}`);
  },
  // get all history of submission
  getAllHistoryOfSubmission: (submissionId) => {
    return config.get(`/submission/${submissionId}/history`);
  },
  // get all history of submission
  getHistoryOfSubmission: (submissionId, historyId) => {
    return config.get(`/submission/${submissionId}/history/${historyId}`);
  },
};
