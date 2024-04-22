import React from "react";
import Editor from "react-simple-code-editor";
import Prism, { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import "prismjs/components";
import "prismjs";

const ProblemCodeLayout = ({ code, setCode }) => {
  return (
    <div
      style={{
        height: "85vh",
        backgroundColor: "#1e1f26",
        color: "#FFF",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
    >
      <Editor
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => highlight(code, languages.clike)}
        padding={10}
        tabSize={2}
        onScroll={(e) => console.log("scroll", e)}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 13,
          position: "relative",
        }}
      />
    </div>
  );
};

export default ProblemCodeLayout;
