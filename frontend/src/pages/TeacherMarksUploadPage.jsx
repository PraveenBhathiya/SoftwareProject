import axios from "axios";
import { Download, PenLine } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TeacherMarksUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileUploading, setIsfileUploading] = useState(false);
  const [excelData, setExcelData] = useState(null); // JSON response from excel sheet
  const [isDownloading, setIsDownloading] = useState(false);
  const navigate = useNavigate();

  // Extract the data from excel file
  const handleFileUpload = async () => {
    setIsfileUploading(true);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Assuming the first sheet is the one we need
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert the sheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setExcelData(jsonData);
        console.log("Converted JSON data:", jsonData);
        const res = await axios.post(
          "http://localhost:4000/api/v1/mark/addMarksFromexcel",
          {
            results: jsonData,
          }
        );
        if (res.status == 201) {
          console.log("Marks uploaded...");
          setIsfileUploading(false);
          setSelectedFile(null);
          setExcelData(false);
          toast("Marks added successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      };

      reader.readAsArrayBuffer(selectedFile); // Read file as array buffer for binary content
    } else {
      alert("Please upload a file");
      setIsfileUploading(false);
    }
  };

  const downloadExcelSheet = async () => {
    setIsDownloading(true);
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/getExcelFormat"
      );
      if (response) {
        const worksheet = XLSX.utils.json_to_sheet(response.data.result);

        // Create a new workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Students Data");

        // Download file
        XLSX.writeFile(workbook, "students_data.xlsx");
        setIsDownloading(false);
      }
    } catch (error) {
      console.log(error);
      setIsDownloading(false);
    }
  };

  // Handles the file upload
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
    },
  });

  // Use effect to see if the excelData updates properly
  useEffect(() => {
    if (excelData) {
      console.log("Updated Excel Data:", excelData);
      // Here you can send the data to the backend or process it further
    }
  }, [excelData]);
  return (
    <div>
      <div className="fixed top-0 right-0 lg:mt-0 mt-10 gap-2">
        {isDownloading ? (
          <button
            type="button"
            disabled={true}
            className="mt-4 gap-4 mr-4 mb-4 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-600 text-white hover:bg-gray-600 focus:outline-none focus:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none"
          >
            <Download />
            Downloading...
          </button>
        ) : (
          <button
            type="button"
            onClick={downloadExcelSheet}
            className="mt-4 gap-4 mr-4 mb-4 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none"
          >
            <Download size={16} />
            Download Sheet
          </button>
        )}
      </div>
      <div className="px-4 py-10">
        <div {...getRootProps({ className: "dropzone" })} style={dropzoneStyle}>
          <input {...getInputProps()} />
          {!selectedFile && (
            <p>Drag & drop a file here, or click to select a file</p>
          )}
          {selectedFile && <p>Selected file: {selectedFile.name}</p>}
        </div>
      </div>
      {isFileUploading ? (
        <button
          type="button"
          className="w-full py-3 px-4 items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          <span
            className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full"
            role="status"
            aria-label="loading"
          ></span>
          Uploading
        </button>
      ) : (
        <button
          onClick={handleFileUpload}
          disabled={!selectedFile}
          type="button"
          className=" w-full py-3 px-4 items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none"
        >
          Upload marks
        </button>
      )}
    </div>
  );
};

const dropzoneStyle = {
  height: "10rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "2px dashed #cccccc",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

export default TeacherMarksUploadPage;
