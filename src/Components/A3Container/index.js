import React from "react";

const A3Container = ({ children, pageNumber }) => {
  const containerStyle = {
    height: "329mm", // A3 height
    width: "483mm", // A3 width
    background: "#ffffff", // white background
  };

  return (
    <div style={containerStyle} className="relative">
      {pageNumber && (
        <div className="absolute right-1/2 translate-x-1/2 top-5">
          Page {pageNumber}
        </div>
      )}
      {children}
    </div>
  );
};

export default A3Container;
