import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button, notification, Spin, Switch, Row, Col } from "antd";
import useHighlight from "./useHighlight";
import "./style.css";

const PAGE_HEIGHT = 329;
const PAGE_WIDTH = 483;
const PAGE_MARGIN = 0; // Margin between pages in mm

const DownloadPdf = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { highligh, toggleHighlight } = useHighlight();
  const printRef = useRef();

  const handleDownloadPdf = async () => {
    try {
      const element = printRef.current;
      setLoading(true);
      const canvas = await html2canvas(element);
      const veryLongImage = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [PAGE_WIDTH, PAGE_HEIGHT],
      });

      const imgWidth = PAGE_WIDTH - 2 * PAGE_MARGIN;
      const imgHeight = (imgWidth * canvas.height) / canvas.width;
      const totalPages = Math.ceil(imgHeight / PAGE_HEIGHT);

      for (let i = 0; i < totalPages; i++) {
        const pageImgBlob = await fetch(veryLongImage).then((response) =>
          response.blob()
        );
        const pageImgUrl = URL.createObjectURL(pageImgBlob);

        const currentPosition = i * PAGE_HEIGHT;
        pdf.addImage(
          pageImgUrl,
          "PNG",
          PAGE_MARGIN,
          PAGE_MARGIN - currentPosition,
          imgWidth,
          imgHeight,
          undefined,
          "FAST"
        );

        if (i < totalPages - 1) {
          pdf.addPage();
        }

        URL.revokeObjectURL(pageImgUrl);
      }

      pdf.save("print.pdf");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      notification.error({ message: error.message });
    }
  };

  return (
    <div>
      <div
        className="w-full flex justify-center items-center sticky bg-blue-200 top-0 z-10 border-blue-700"
        style={{ borderBottom: "5px solid" }}
      >
        <Row gutter={0} justify="center" align="middle">
          <Col span={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Button
              className="bg-blue-800 m-5"
              type="primary"
              onClick={handleDownloadPdf}
              loading={loading}
            >
              Download Sticker File
            </Button>
          </Col>
          <Col span={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Switch
              className="bg-slate-400 m-3"
              type="primary"
              onChange={toggleHighlight}
              loading={loading}
              checked={highligh}
            />
            <span className="-ml-1">
              {highligh ? "Sembunyikan" : "Tampilkan"} Duplicate
            </span>
          </Col>
        </Row>
      </div>

      <div
        className="bg-slate-500 flex md:justify-center justify-start p-5 border-2 overflow-scroll"
        style={{ minHeight: "80vh", zoom: "0.7" }}
      >
        <div className="shadow-paper h-auto flex md:justify-center justify-start justify-self-center">
          <div ref={printRef}>
            {loading ? (
              <div className="bg-white px-20 py-10 text-center">
                <Spin size="large" tip="Loading..." />
                <p className="mt-5 italic">Sabar gan, agak lama ni...</p>
              </div>
            ) : (
              React.cloneElement(children, { highligh: highligh })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPdf;
