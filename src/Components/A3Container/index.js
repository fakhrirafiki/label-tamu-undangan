import React from "react";

const A3Container = ({ children, pageNumber }) => {
  const containerStyle = {
    width: "483mm", // A3 width
    height: "329mm", // A3 width
    background: "#ffffff", // white background
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", // box shadow
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
