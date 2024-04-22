import React, { useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import ProblemApi from "../../api/problem.api";
import ProblemTable from "../../components/Problem";
import FormProblem from "../../components/Problem/FormProblem";

const Problem = () => {
  const [dataProblem, setDataProblem] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  useEffect(() => {
    ProblemApi.getAllProblems({})
      .then((res) => {
        const newData = [];
        res.data.forEach(async (item) => {
          const resp = await ProblemApi.getAllTestcasesOfProblem(item._id);
          // .then((resp) => {
          const newItem = item;
          newItem.testcases = resp.data;
          newData.push(newItem);
          setDataProblem([...newData]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshData]);

  return (
    <>
      <h1>Problem</h1>
      <Card>
        <Card.Header as="h5">
          <Row>
            <Col>List all problem</Col>
            <Col style={{ display: "flex", justifyContent: "flex-end" }}>
              <FormProblem refreshData setRefreshData={setRefreshData} />
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <ProblemTable
            refreshData
            setRefreshData={setRefreshData}
            dataProblem={dataProblem}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default Problem;
