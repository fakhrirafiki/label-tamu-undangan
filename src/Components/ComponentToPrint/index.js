import React from "react";
import A3Container from "../A3Container";
import LabelCard from "../LabelCard";
import { chunkArray } from "../../utils";

const ComponentToPrint = () => {
  const bigArray = Array.from({ length: 300 }, (_, i) => `String ${i + 1}`);

  const chunkedArray = chunkArray(bigArray, 63);

  return (
    <div>
      {chunkedArray.map((page, i) => (
        <A3Container pageNumber={i + 1} key={i + 1}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 63mm)",
              placeContent: "center",
              padding: "15mm",
            }}
          >
            {page.map((name, i) => (
              <LabelCard key={i} name={name} />
            ))}
          </div>
        </A3Container>
      ))}
    </div>
  );
};

export default ComponentToPrint;
