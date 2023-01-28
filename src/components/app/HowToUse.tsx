import React from "react";
import { Accordion } from "react-bootstrap";
import { MobileSVG, PCSVG } from "./svg";

const HowToUse = () => {
  return (
    <Accordion defaultActiveKey="0" className="mb-3">
      <Accordion.Item eventKey="0">
        <Accordion.Header>사용법</Accordion.Header>
        <Accordion.Body>
          <ul>
            <li>
              <span className="text-danger fw-bold">팝업 차단을 해제해주세요!</span>
            </li>
            <li>
              <MobileSVG/>
              <span>모바일 리워드 ➡️ 모바일 엣지 브라우저 </span>
            </li>
            <li>
              <PCSVG/>
              <span>PC 리워드 ➡️ PC 엣지 브라우저 </span>
            </li>
          </ul>
          <ol>
            <li>검색할 횟수, 검색어를 입력해주세요</li>
            <li>검색버튼을 누르면 3초 뒤에 새창으로 검색을 시작합니다.</li>
            <li>새 창이 3초 뒤에 자동적으로 닫힙니다.</li>
            <li>지정한 횟수에 맞게 반복합니다.</li>
            <li>지정 횟수가 완료되면 멈춥니다.</li>
          </ol>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>주의사항</Accordion.Header>
        <Accordion.Body>
          <ul>
            <li className="text-danger fw-bold">
              반드시 엣지브라우저로 열어야합니다.
            </li>
            <li className="text-danger fw-bold">
              각 리워드 환경에 맞게 진행해주세요.
            </li>
            <li>중간에 정지할 수 있으면 다시 시작이 가능합니다.</li>
            <li>완료시 리워드가 잘 들어왔는데 꼭 확인하세요.</li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default HowToUse;
