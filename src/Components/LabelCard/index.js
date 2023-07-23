import React from "react";

function LabelCard({ tamu, highligh }) {
  const labelStyle = {
    width: "63mm", // A3 width
    height: "33mm", // A3 width
    background: highligh && tamu.isPotentiallyDuplicateFlag ? "red" : "#ffffff", // white background
    border: "1px solid #eee",
  };

  return (
    <div
      style={labelStyle}
      className="p-2 text-center flex justify-center items-center text-sm transition-all duration-300"
    >
      <div>
        <p>{tamu.Nama.toUpperCase()}</p>
        {tamu.Jabatan && <p>{tamu.Jabatan}</p>}
        <p>
          {`     di `} {!!tamu?.Alamat ? tamu?.Alamat : "tempat"}
        </p>
      </div>
    </div>
  );
}

export default LabelCard;
