import React, { useEffect, useRef, useState } from "react";
import { Button, Spinner, Stack } from "react-bootstrap";
import { StatusType } from "./App";

interface NewTabRef {
  current: Window | null;
}

interface ButtonsProps {
  status: StatusType;
  setStatus: (arg: StatusType) => void;
  prefix: string;
  maxCount: number;
}

const TIMEOUT_TIME = 2000;

const Buttons: React.FC<ButtonsProps> = ({
  status,
  setStatus,
  prefix,
  maxCount,
}) => {
  const [searchText, setSearchText] = useState("bing");
  const [count, setCount] = useState(0);
  const newTabRef: NewTabRef = useRef(null);

  const url = `https://www.bing.com/search?q=${searchText}&qs=ds&form=QBRE`;

  useEffect(() => {
    if (status === "stop") {
      return;
    }
    if (maxCount !== 0 && count === maxCount) {
      return setStatus("complete");
    }

    if (count !== 0 && count <= maxCount) {
      const timer = setTimeout(() => {
        handleNewTab();
      }, TIMEOUT_TIME);
      return () => clearTimeout(timer);
    }
  }, [count]);

  const createNewSearchText = () => {
    setCount((prevState) => prevState + 1);
    setSearchText((prev) => {
      let text = "";
      if (prev === "bing") {
        text = prefix + "1";
      } else {
        text = prev + "1";
      }
      return text;
    });
  };

  const handleOpenNewTab = () => {
    newTabRef.current = window.open(url, "_blank");
  };
  const handleCloseNewTab = () => {
    if (newTabRef.current) {
      newTabRef.current.close();
    }
  };

  const handleNewTab = () => {
    if (status === "waiting") {
      setStatus("progressing");
    }
    handleOpenNewTab();
    const timer = setTimeout(() => {
      handleCloseNewTab();
      createNewSearchText();
    }, TIMEOUT_TIME);
    return () => clearTimeout(timer);
  };

  const stopMacro = () => {
    setStatus("stop");
  };

  const resumeMacro = () => {
    setStatus("progressing");
    handleNewTab();
  };

  const renderStatusText = () => {
    let statusObj;
    switch (status) {
      case "waiting":
        statusObj = { btnName: "검색 🔍", btnColor: "primary" };
        break;
      case "progressing":
        statusObj = { btnName: "자동 검색 중 🧑‍💻", btnColor: "primary" };
        break;
      case "complete":
        statusObj = {
          btnName: "완료 ✅",
          btnColor: "primary",
        };
        break;
      case "stop":
        statusObj = { btnName: "중지 🟥", btnColor: "warning" };
        break;
      default:
        statusObj = { btnName: "이것은 무엇이죠?", btnColor: "danger" };
    }
    return statusObj;
  };

  return (
    <div className="buttons">
      <Stack gap={3}>
        <Button
          variant={renderStatusText().btnColor}
          size="lg"
          onClick={handleNewTab}
          disabled={
            prefix === "" || status === "progressing" || status === "stop"
          }
        >
          <Stack
            direction="horizontal"
            gap={3}
            className="justify-content-center"
          >
            <span>{renderStatusText().btnName}</span>
            {count !== 0 && status !== "complete" && <span>{count}</span>}
            {status === "progressing" && (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </Stack>
        </Button>
        {status === "progressing" && (
          <Button variant="danger" size="lg" onClick={stopMacro}>
            <span>중지</span>
          </Button>
        )}
        {status === "stop" && (
          <Button variant="danger" size="lg" onClick={resumeMacro}>
            <span>다시하기</span>
          </Button>
        )}
      </Stack>
    </div>
  );
};

export default Buttons;
