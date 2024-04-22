import React, { useEffect } from "react";
import HistorySubmission from "../../../components/Submission/Detail";
import { useParams } from "react-router-dom";
import { SubmissionApi } from "../../../api/submission.api";
const SubmissionDetail = () => {
  const query = useParams();
  const { submissionId } = query;
  const [data, setData] = React.useState([]);

  useEffect(() => {
    SubmissionApi.getAllHistoryOfSubmission(submissionId)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1>Submission Detail</h1>
      <HistorySubmission data={data} />
    </>
  );
};

export default SubmissionDetail;
