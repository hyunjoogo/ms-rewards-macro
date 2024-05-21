import React, {useEffect, useRef, useState} from 'react';
import {Button, Form, Spinner, Stack} from 'react-bootstrap';
import {StatusType} from './App';
import {wordList} from '../word';

interface NewTabRef {
  current: Window | null;
}

interface ButtonsProps {
  status: StatusType;
  setStatus: (arg: StatusType) => void;
  maxCount: number;
}

const TIMEOUT_TIME = 3000;

const Buttons: React.FC<ButtonsProps> = ({
                                           status,
                                           setStatus,
                                           maxCount,
                                         }) => {
  const [searchText, setSearchText] = useState('오버워치');
  const [count, setCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false)
  const newTabRef: NewTabRef = useRef(null);

  // const url = `https://www.bing.com/search?q=${searchText}&qs=ds&form=QBRE`;
  const url = `https://www.bing.com/news/search?q=${searchText}&qs=n&form=QBNT&sp=-1&lq=0&pq=${searchText}&sc=10-3&sk=&cvid=7EDA26C890DC474188DA9AE0BFFC2F9E&ghsh=0&ghacc=0&ghpl=`
const moUrl = `https://www.bing.com/search?q=${searchText}&sk=HS3LT1&sc=10-2&cvid=3FFBC06E4A24434D92A00D4BBC38C09F&FORM=QBLH&sp=5&ghc=1&lq=0`
  useEffect(() => {
    if (status === 'stop') {
      return;
    }
    if (maxCount !== 0 && count === maxCount) {
      return setStatus('complete');
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
    setSearchText(getRandomCharacter());
  };

  function getRandomCharacter() {
    const koreanStringArray = wordList;
    const arrayLength = koreanStringArray.length;
    const randomIndex = Math.floor(Math.random() * arrayLength);
    return koreanStringArray[randomIndex].charAt(Math.floor(Math.random() * koreanStringArray[randomIndex].length));
  }

  const handleOpenNewTab = () => {
    const URL = isMobile ? moUrl : url;
    newTabRef.current = window.open(URL, '_blank');
  };
  const handleCloseNewTab = () => {
    if (newTabRef.current) {
      newTabRef.current.close();
    }
  };

  const handleNewTab = () => {
    if (status === 'waiting') {
      setStatus('progressing');
    }
    handleOpenNewTab();
    const timer = setTimeout(() => {
      handleCloseNewTab();
      createNewSearchText();
    }, TIMEOUT_TIME);
    return () => clearTimeout(timer);
  };

  const stopMacro = () => {
    setStatus('stop');
  };

  const resumeMacro = () => {
    setStatus('progressing');
    handleNewTab();
  };

  const renderStatusText = () => {
    let statusObj;
    switch (status) {
      case 'waiting':
        statusObj = {btnName: '검색 🔍', btnColor: 'primary'};
        break;
      case 'progressing':
        statusObj = {btnName: '자동 검색 중 🧑‍💻', btnColor: 'primary'};
        break;
      case 'complete':
        statusObj = {
          btnName: '완료 ✅',
          btnColor: 'primary',
        };
        break;
      case 'stop':
        statusObj = {btnName: '중지 🟥', btnColor: 'warning'};
        break;
      default:
        statusObj = {btnName: '이것은 무엇이죠?', btnColor: 'danger'};
    }
    return statusObj;
  };

  return (
    <div className="buttons">
      <Stack gap={3}>
        <Form.Check // prettier-ignore
          type="switch"
          id="custom-switch"
          label="Mobile 검색"
          checked={isMobile}
          onChange={() => setIsMobile(!isMobile)}
        />
        <Button
          variant={renderStatusText().btnColor}
          size="lg"
          onClick={handleNewTab}
          disabled={
            status === 'progressing' || status === 'stop'
          }
        >
          <Stack
            direction="horizontal"
            gap={3}
            className="justify-content-center"
          >
            <span>{renderStatusText().btnName}</span>
            {count !== 0 && status !== 'complete' && <span>{count}</span>}
            {status === 'progressing' && (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </Stack>
        </Button>
        {status === 'progressing' && (
          <Button variant="danger" size="lg" onClick={stopMacro}>
            <span>중지</span>
          </Button>
        )}
        {status === 'stop' && (
          <Button variant="danger" size="lg" onClick={resumeMacro}>
            <span>다시하기</span>
          </Button>
        )}
      </Stack>
    </div>
  );
};

export default Buttons;
