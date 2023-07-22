import React from "react";

const LoadingSearch = () => {
  return (
    <div className="flex items-center justify-center h-full p-10">
      <div className="w-5 h-5 border-4 border-t-4 rounded-full border-primary border-t-transparent animate-spin"></div>
    </div>
  );
};

export default LoadingSearch;
