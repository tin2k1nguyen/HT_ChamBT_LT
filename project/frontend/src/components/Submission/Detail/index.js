import React from "react";
import { Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Testcases from "./Testcases";

const HistorySubmission = ({ data }) => {
  const { code } = useLocation().state;
  console.log("code", code);
  const [result, setResult] = React.useState({
    success: 0,
    fail: 0,
  });
  const onHandleChange = (e) => {
    setResult({ ...result, ...e });
  };
  React.useEffect(() => {
    let success = 0;
    let fail = 0;
    data.map((item) => {
      if (
        item?.testcase?.output === item?.output?.replace(/(\r\n|\n|\r)/gm, "")
      ) {
        success++;
      } else {
        fail++;
      }
    });
    onHandleChange({ success, fail });
  }, [data]);

  return (
    <Card className="mb-4">
      <Card.Header as="h5">Submission #1</Card.Header>
      <Card.Header as="h5">
        Result: {`${result.success}/${result.fail + result.success}`}
      </Card.Header>
      <Card.Body>
        <Card.Title>List of testcases</Card.Title>
        <Testcases code={code} data={data} />
      </Card.Body>
    </Card>
  );
};

export default HistorySubmission;
