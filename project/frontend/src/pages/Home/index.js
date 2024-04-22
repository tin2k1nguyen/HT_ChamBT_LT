import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProblemApi from "../../api/problem.api";
import BasicInfo from "../../components/Home/BasicInfo";
import { selectUser } from "../../store/user/userSlice";

const Home = () => {
  const [dataProblem, setDataProblem] = useState([]);
  useEffect(() => {
    ProblemApi.getAllProblems({})
      .then((res) => {
        setDataProblem(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Row>
        <h1>Home</h1>
        {/* set layout card display */}
        {dataProblem.map((problem) => (
          <BasicInfo data={problem} />
        ))}
      </Row>
    </>
  );
};

export default Home;
