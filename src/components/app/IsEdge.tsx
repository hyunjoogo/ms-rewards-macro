import React, { useEffect, useState } from "react";

const IsEdge = () => {
  const [isEdge, setIsEdge] = useState(false);

  useEffect(() => {
    const pattern = new RegExp(/Edg/);
    setIsEdge(pattern.test(navigator.userAgent));
  }, []);

  return (
    <p className={`text-center fw-bold ${!isEdge && "text-danger"}`}>
      {isEdge ? "엣지브라우저로 접속하셨습니다." : "엣지브라우저가 아닙니다."}
    </p>
  );
};

export default IsEdge;
