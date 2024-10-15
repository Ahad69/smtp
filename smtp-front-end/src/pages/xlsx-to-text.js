import React, { useState } from "react";
import * as XLSX from "xlsx";

const XlsxToTextConverter = () => {
  const [file, setFile] = useState(null);
  const [textOutput, setTextOutput] = useState("");

  const convertXlsxToText = () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      let output = "";

      // Loop through each sheet in the workbook
      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const sheetText = XLSX.utils.sheet_to_csv(worksheet);
        output += `Sheet: ${sheetName}\n${sheetText}\n\n`;
      });

      setTextOutput(output);
    };

    reader.onerror = (error) => {
      console.error("File could not be read:", error);
      setTextOutput("Failed to convert file.");
    };

    reader.readAsArrayBuffer(file);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setTextOutput(""); // Clear previous output
    }
  };

  const downloadTextFile = () => {
    if (!textOutput) {
      alert("No text to download. Please convert the file first.");
      return;
    }

    const blob = new Blob([textOutput], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "converted-text.txt";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="p-4">
      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={convertXlsxToText}
        className="bg-cyan-600 text-white px-4 py-2 rounded mr-4"
      >
        Convert
      </button>
      <button
        onClick={downloadTextFile}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Download Text File
      </button>
      <pre className="bg-gray-100 text-black p-4 mt-4 rounded-lg">
        {textOutput}
      </pre>
    </div>
  );
};

export default XlsxToTextConverter;
