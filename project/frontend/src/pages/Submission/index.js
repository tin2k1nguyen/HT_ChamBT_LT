import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import ProblemApi from "../../api/problem.api";
import { SubmissionApi } from "../../api/submission.api";
import SubmissionTable from "../../components/Submission";

const Submission = () => {
  const [dataSubmission, setDataSubmission] = useState([]);
  useEffect(() => {
    SubmissionApi.getAllSubmissions()
      .then((res) => {
        setDataSubmission(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <h1>Submission</h1>
      <Card>
        <Card.Header as="h5">
          <Row>
            <Col>List all Submission</Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <SubmissionTable dataSubmission={dataSubmission} />
        </Card.Body>
      </Card>
    </>
  );
};

export default Submission;
