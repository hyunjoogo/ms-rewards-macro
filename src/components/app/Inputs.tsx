import React from 'react';
import {FloatingLabel, FormControl} from 'react-bootstrap';
import {StatusType} from './App';

interface InputsProps {
  status: StatusType;
  maxCount: number;
  setMaxCount: (arg: number) => void;
}

const Inputs: React.FC<InputsProps> = ({
                                         status,
                                         maxCount,
                                         setMaxCount,
                                       }) => {
  const LIMIT_COUNT = 50;

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
          disabled={status === 'progressing'}
          value={maxCount === 0 ? '' : maxCount}
          onChange={handleChange}
        />
      </FloatingLabel>
    </div>
  );
};

export default Inputs;
