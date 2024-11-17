import React, { useState } from "react";
import API from "../api";

function UploadDocument() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // Track upload state

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true); // Set uploading state for visual feedback

    if (!file) {
      alert("Please select a file to upload.");
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await API.post("/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Document uploaded successfully!");
      setIsUploading(false); // Reset uploading state

      // Option 1: Redirect to a new page (consider for a clear transition)
      // window.location.href = "/success"; // Replace with your success page path

      // Option 2: Forced refresh for in-place update (consider for confirmation)
       window.location.reload();

      // Option 3: Clear file selection (optional)
      setFile(null);
    } catch (err) {
      console.error("Error uploading document:", err.response?.data || err.message);
      alert("Upload failed. Please try again.");
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload Document</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} disabled={isUploading} /> {/* Disable input while uploading */}
        <button type="submit" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}

export default UploadDocument;