import React from "react";
import "../../asset/css/Loading.css";
const LoadingPage = () => {
  return (
    <div className="loading-elem">
      <div className="">
        <div className="spiner"></div>
        <div className="bar">
          <span className="dot1"></span>
          <span className="dot2"></span>
          <span className="dot3"></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
