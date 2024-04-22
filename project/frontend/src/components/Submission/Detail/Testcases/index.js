import React, { useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";

function Testcases({ data, code }) {
  console.log("code", code);

  return (
    <Accordion>
      <Accordion.Item eventKey="code0">
        <Accordion.Header>Code</Accordion.Header>
        <Accordion.Body>
          <pre>{code}</pre>
        </Accordion.Body>
      </Accordion.Item>

      {data?.length
        ? data.map((item, index) => (
            <Accordion.Item eventKey={index + 1}>
              <Accordion.Header>
                Testcase #{index + 1}
                {item?.testcase?.output ===
                item?.output.replace(/(\r\n|\n|\r)/gm, "") ? (
                  <i
                    className="fa fa-check-circle"
                    style={{ color: "green" }}
                  />
                ) : (
                  <i className="fa fa-circle" style={{ color: "red" }} />
                )}
              </Accordion.Header>
              <Accordion.Body>
                <p>Input: {item?.testcase?.input}</p>
                <p>Output: {item.output}</p>
                <p>Expected: {item?.testcase?.output}</p>
                <p>
                  Result:{" "}
                  {item?.testcase?.output ===
                  item?.output.replace(/(\r\n|\n|\r)/gm, "")
                    ? "Correctly answer"
                    : "Wrong answer"}
                </p>
                <p>Memory: {item.memory}</p>
                <p>Time: {item.time}</p>
              </Accordion.Body>
            </Accordion.Item>
          ))
        : "Not found testcase"}
    </Accordion>
  );
}

export default Testcases;
