import React from "react";

export const MobileSVG = () => {
  return (
    <svg
      className="icon mobile"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2048 2048"
      width="15"
      height="15"
    >
      <path d="M1536 0q27 0 50 10t40 27 28 41 10 50v1792q0 27-10 50t-27 40-41 28-50 10H512q-27 0-50-10t-40-27-28-41-10-50V128q0-27 10-50t27-40 41-28 50-10h1024zm-384 1792v-128H896v128h256z"></path>
    </svg>
  );
};

export const PCSVG = () => {
  return (
    <svg
      className="icon pc"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2048 2048"
      width="17"
      height="17"
    >
      <path d="M1792 384v896H256V384h1536zm256 1280q0 27-10 50t-27 40-41 28-50 10H128q-27 0-50-10t-40-27-28-41-10-50q0-16 3-35t8-37 14-35 21-29l120-120h1717l57 57q28 28 57 58 12 13 21 30t16 35 10 38 4 38z"></path>
    </svg>
  );
};
