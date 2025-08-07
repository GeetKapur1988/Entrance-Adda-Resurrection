import React, { useState } from "react";
import { parseUploadedFile } from "/src/api/ocr/parse.js";

export default function OCRUpload() {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    try {
      const extracted = await parseUploadedFile(image);
      setResults(extracted);
      console.log("Extracted:", extracted);
    } catch (err) {
      console.error("Parsing failed:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Upload Image for OCR</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button
        onClick={handleUpload}
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Process OCR
      </button>
      {results.length > 0 && (
        <div className="mt-4 bg-gray-100 p-2 rounded">
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}