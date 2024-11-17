import React, { useState, useEffect } from "react";
import API from "../api";

function DocumentList() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const { data } = await API.get("/documents");
        setDocuments(data);
      } catch (err) {
        console.error("Error fetching documents:", err.response?.data || err.message);
        // Handle error, e.g., display an error message to the user
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div>
      <h2>Uploaded Documents</h2>
      <ul>
        {documents.map((doc) => (
          <li key={doc._id}>
            <a href={`http://localhost:5000/uploads/${doc.filename}`} target="_blank" rel="noopener noreferrer">
              {doc.filename}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DocumentList;