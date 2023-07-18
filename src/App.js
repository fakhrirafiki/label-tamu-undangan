import React from "react";
import ComponentToPrint from "./Components/ComponentToPrint";
import DownloadPdf from "./Components/DownloadPdf";

const App = () => {
  return (
    <DownloadPdf>
      <ComponentToPrint />
    </DownloadPdf>
  );
};

export default App;
