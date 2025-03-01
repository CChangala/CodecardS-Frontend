import React from "react";
import "./ProgressBar.css";

function ProgressBar({ progress }) {
  return (
    <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
        <span>{Math.round(progress)}%</span>
    </div>
  );
}

export default ProgressBar;