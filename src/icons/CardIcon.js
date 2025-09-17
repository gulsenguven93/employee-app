import React from "react";

const CardIcon = ({ size = 24, color = "#000" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <path d="M3 10h18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

export default CardIcon;
