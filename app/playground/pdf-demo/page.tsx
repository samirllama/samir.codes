import React from "react";

const PDFDemoPage = () => {
  const pdfUrl = "/assets/sample.pdf";
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">PDF Demo</h1>
      <div className="mb-8">
        <a
          href={pdfUrl}
          download="sample.pdf"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {" "}
          Download PDF
        </a>
      </div>
      <div>
        <div className="w-full h-screen">
          <iframe
            className="border-none"
            src={pdfUrl}
            title="PDF Viewer"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default PDFDemoPage;
