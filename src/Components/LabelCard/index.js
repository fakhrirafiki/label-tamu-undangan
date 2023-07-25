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
      className="relative p-2 text-center flex flex-col justify-center items-center text-sm transition-all duration-300"
    >
      <div>
        <p>{tamu.Nama.toUpperCase()}</p>
        {tamu.Jabatan && <p>{tamu.Jabatan}</p>}
        <p>
          {`     di `} {!!tamu?.Alamat ? tamu?.Alamat : "tempat"}
        </p>
      </div>

      <div
        className="absolute bottom-0 right-0 left-0 p-0 m-0"
        style={{ borderBottom: `6px solid ${tamu.Color}`, fontSize: 6 }}
      >
        <span
          className="block"
          style={{ marginBottom: -13, color: tamu.TextColor }}
        >
          {tamu.Bagian}
        </span>
      </div>
    </div>
  );
}

export default LabelCard;
