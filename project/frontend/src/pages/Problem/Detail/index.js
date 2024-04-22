import { notification } from "antd";
import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ProblemApi from "../../../api/problem.api";
import { SubmissionApi } from "../../../api/submission.api";
import ProblemDetailInfo from "../../../components/Problem/Detail";

const ProblemDetail = () => {
  const [code, setCode] = useState(`
  /*package whatever //do not write package name here */

import java.io.*;

class Test {
	public static void main (String[] args) {
		System.out.println("GfG!");
	}
}
  `);
  const param = useParams();
  const navigate = useNavigate();
  const handleSubmit = () => {
    SubmissionApi.createSubmission({
      code,
      language: "java",
      save: false,
      problem: {
        _id: param.problemId,
      },
    })
      .then(() => {
        notification.success({
          message: "Submit successful",
        });
        navigate("/submission");
      })
      .catch((e) => {
        console.log(e);
        notification.error({
          message: "Error when submit",
        });
      });
  };
  return (
    <>
      <Row>
        <Col>
          <h1>Problem Detail</h1>
        </Col>
        <Col style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleSubmit} className="mt-2 mb-2">
            Submit
          </Button>
        </Col>
      </Row>
      <ProblemDetailInfo code={code} setCode={setCode} />
    </>
  );
};

export default ProblemDetail;
