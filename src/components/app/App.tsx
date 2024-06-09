import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Inputs from "./Inputs";
import Buttons from "./Buttons";
import "./style.css";

export type StatusType = "waiting" | "progressing" | "complete" | "stop";

function App() {
  const [maxCount, setMaxCount] = useState<number>(50);
  const [status, setStatus] = useState<StatusType>("waiting");

  return (
    <Container className="container">
      <h1 className="text-center py-2">MS-REWORD-MACRO</h1>
      <div className="app">
        <Inputs
          status={status}
          maxCount={maxCount}
          setMaxCount={setMaxCount}
        />
        <Buttons
          status={status}
          setStatus={setStatus}
          maxCount={maxCount}
        />
      </div>
    </Container>
  );
}

export default App;
