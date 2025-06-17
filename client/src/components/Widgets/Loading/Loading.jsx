import React from "react";
import "./Loading.css"; // ou le chemin vers ton CSS

const Loading = () => {
  return (
    <div className="loader-wrapper">
      <div className="embrace-loader">
        <div className="circle-half circle-left"></div>
        <div className="circle-half circle-right"></div>
        <div className="shelter-icon">
          <div className="roof"></div>
          <div className="door"></div>
        </div>
        <div className="comfort-pulse"></div>
        <svg className="loading-circle-text" viewBox="0 0 200 200">
          <defs>
            <path
              id="circlePath"
              d="M 100, 100 m -85, 0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
            />
          </defs>
          <text dy="5" textLength="530">
            <textPath href="#circlePath">
              Chargement... Chargement... Chargement...
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
};

export default Loading;
