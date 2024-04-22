import TextArea from "antd/es/input/TextArea";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import ProblemApi from "../../../../api/problem.api";

const ProblemDescription = ({ problemId }) => {
  const [data, setData] = React.useState();

  useEffect(() => {
    ProblemApi.getProblemById(problemId)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div
      style={{
        height: "85vh",
        backgroundColor: "#FFF",
        color: "#857f7f",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
    >
      <Row>
        <Col>
          <p>
            <i className="fa fa-user" />
            <span style={{ marginLeft: "5px" }}>{data?.user.name}</span>
          </p>
        </Col>

        <Col>
          <i className="fa fa-book" />
          <p>{data?.title}</p>
        </Col>
      </Row>
      {/* detail  */}
      <Row>
        <TextArea rows={5} readOnly bordered={null} value={data?.description} />
      </Row>
    </div>
  );
};

export default ProblemDescription;
