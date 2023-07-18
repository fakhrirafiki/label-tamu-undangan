import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button, notification, Spin, Divider } from "antd";

const DownloadPdf = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const printRef = useRef();

  const handleDownloadPdf = async () => {
    try {
      const element = printRef.current;
      setLoading(true);
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [329, 483],
      });

      console.log("pdf", pdf);

      const imgProperties = pdf.getImageProperties(data);
      console.log("imgProperties", imgProperties);

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

      console.log("pdfWidth", pdfWidth);
      console.log("pdfHeight", pdfHeight);

      // pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
      // pdf.save("print.pdf");
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
        className="w-full flex justify-center sticky bg-blue-200 top-0 z-10 border-blue-700"
        style={{ borderBottom: "5px solid" }}
      >
        <Button
          className="bg-blue-800 m-5"
          type="primary"
          onClick={handleDownloadPdf}
          loading={loading}
        >
          Download as PDF
        </Button>
      </div>

      <div
        className="bg-slate-500 flex justify-center items-center p-5 border-2"
        style={{ minHeight: "80vh" }}
      >
        <div ref={printRef}>
          {loading ? (
            <div className="bg-white px-20 py-10 text-center">
              <Spin size="large" tip="Loading..." />
              <p className="mt-5 italic">Loading...</p>
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadPdf;
