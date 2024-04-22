import React from "react";
import { useParams } from "react-router-dom";
import Split from "react-split";
import ProblemCodeLayout from "./ProblemCodeLayout";
import ProblemDescription from "./ProblemDescripion";
import "./style.css";

const ProblemDetailInfo = ({ code, setCode }) => {
  const param = useParams();
  return (
    <div>
      <Split
        className="wrap"
        sizes={[25, 75]}
        minSize={250}
        expandToMin={false}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
      >
        <ProblemDescription problemId={param.problemId} />
        <ProblemCodeLayout code={code} setCode={setCode} />
      </Split>
    </div>
  );
};

export default ProblemDetailInfo;
