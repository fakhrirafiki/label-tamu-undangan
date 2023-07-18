import React from "react";

function LabelCard({ name }) {
  const labelStyle = {
    width: "63mm", // A3 width
    height: "33mm", // A3 width
    background: "#ffffff", // white background
    border: "1px solid #eee",
  };
  return (
    <div style={labelStyle} className="p-2">
      {name}
    </div>
  );
}

export default LabelCard;
