// CircularProgressBar.js
import React from "react";
import PropTypes from "prop-types";

const CircularProgressBar = ({ progress }) => {
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);
  const radius = 50; // Radius of the circle
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (normalizedProgress / 100) * circumference;

  return (
    <div style={{ background: "white", borderRadius: "50%" }}>
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#F3F4FA"
          strokeWidth="10"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#44B77B"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 60 60)"
          strokeLinecap="round"
        />
        <text
          x="60"
          y="65"
          fill="#333"
          fontSize="20"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {`${normalizedProgress}%`}
        </text>
      </svg>
    </div>
  );
};

CircularProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default CircularProgressBar;
