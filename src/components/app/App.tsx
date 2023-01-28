import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Inputs from "./Inputs";
import Buttons from "./Buttons";
import "./style.css";
import IsEdge from "./IsEdge";
import HowToUse from "./HowToUse";

export type StatusType = "waiting" | "progressing" | "complete" | "stop";

function App() {
  const [prefix, setPrefix] = useState<string>("");
  const [maxCount, setMaxCount] = useState<number>(0);
  const [status, setStatus] = useState<StatusType>("waiting");

  return (
    <Container className="container">
      <h1 className="text-center py-2">MS-REWORD-MACRO</h1>
      <IsEdge/>
      <div className="app">
        <HowToUse/>
        <Inputs
          status={status}
          prefix={prefix}
          setPrefix={setPrefix}
          maxCount={maxCount}
          setMaxCount={setMaxCount}
        />
        <Buttons
          status={status}
          setStatus={setStatus}
          prefix={prefix}
          maxCount={maxCount}
        />
      </div>
    </Container>
  );
}

export default App;
