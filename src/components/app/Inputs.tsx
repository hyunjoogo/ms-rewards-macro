import React from "react";
import { FloatingLabel, Form, FormControl } from "react-bootstrap";
import { StatusType } from "./App";

interface InputsProps {
  status: StatusType;
  prefix: string;
  setPrefix: (arg: string) => void;
  maxCount: number;
  setMaxCount: (arg: number) => void;
}

const Inputs: React.FC<InputsProps> = ({
  status,
  prefix,
  setPrefix,
  maxCount,
  setMaxCount,
}) => {
  const LIMIT_COUNT = 30;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!isNaN(Number(value))) {
      setMaxCount(Number(value));
    }
    if (Number(value) > LIMIT_COUNT) {
      setMaxCount(LIMIT_COUNT);
    }
  };

  return (
    <div className="inputs">
      <FloatingLabel
        controlId="maxCount"
        label={`검색할 횟수를 적어주세요 (최대 : ${LIMIT_COUNT})`}
        className="mb-3"
      >
        <FormControl
          size="lg"
          type="number"
          placeholder="검색할 횟수를 적어주세요"
          isValid={maxCount > 0}
          isInvalid={maxCount === 0}
          disabled={status === "progressing"}
          onKeyPress={(event) => {
            const keyCode = event.keyCode || event.which;
            const keyValue = String.fromCharCode(keyCode);
            if (/\+|-/.test(keyValue)) event.preventDefault();
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          value={maxCount === 0 ? "" : maxCount}
          onChange={handleChange}
        />
      </FloatingLabel>

      {maxCount !== 0 && (
        <FloatingLabel
          controlId="prefix"
          label="기본 검색어를 적어주세요."
          className="mb-3"
        >
          <Form.Control
            size="lg"
            type="text"
            placeholder="기본 검색어를 적어주세요."
            isValid={prefix !== ""}
            isInvalid={prefix === ""}
            disabled={status === "progressing"}
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
          />
        </FloatingLabel>
      )}
    </div>
  );
};

export default Inputs;
