import React, { useEffect, useState } from "react";
import { notification } from "antd";
import A3Container from "../A3Container";
import LabelCard from "../LabelCard";
import { chunkArray, fetchSpreadsheetData } from "../../utils";

const ComponentToPrint = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allTamu = await fetchSpreadsheetData();
        setData(
          chunkArray(
            allTamu.map((tamu) => tamu.Nama),
            63
          )
        );
      } catch (error) {
        console.log(error);
        notification.error(error.error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.map((page, i) => (
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
              <LabelCard key={i} name={`${name}`} />
            ))}
          </div>
        </A3Container>
      ))}
    </div>
  );
};

export default ComponentToPrint;
