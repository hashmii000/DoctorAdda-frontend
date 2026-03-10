import React, { useState, useEffect } from "react";
import { postRequest } from "../../../Helpers";

const DocumentsUpload = ({
  formData,
  setFormData,
  documentOptions,
  errors,
  clearError,
}) => {
  const [uploading, setUploading] = useState(false);

  // Ensure at least one document row exists by default
  useEffect(() => {
    if (!formData.documents || formData.documents.length === 0) {
      setFormData((prev) => ({
        ...prev,
        documents: [{ name: "", number: "", image: "" }],
      }));
    }
  }, [formData.documents, setFormData]);

  const handleFileUpload = async (file, index) => {
    setUploading(true);
    try {
      const formDataData = new FormData();
      formDataData.append("file", file);

      const response = await postRequest({
        url: `upload/uploadImage`,
        cred: formDataData,
      });

      const uploadedUrl = response?.data?.data?.imageUrl;

      setFormData((prev) => {
        const updatedDocs = [...(prev.documents || [])];
        updatedDocs[index] = {
          ...updatedDocs[index],
          image: uploadedUrl,
          fileType: file.type, // ✅ store type
        };
        return { ...prev, documents: updatedDocs };
      });

      clearError(`documentImage_${index}`);
    } catch (err) {
      console.error("File upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleAddDocument = () => {
    setFormData((prev) => ({
      ...prev,
      documents: [
        ...(prev.documents || []),
        { name: "", number: "", image: "" },
      ],
    }));
  };

  const handleRemoveDocument = (index) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header with button */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          Upload Documents
        </h3>
        <button
          type="button"
          onClick={handleAddDocument}
          className="px-4 py-2 bg-gradient-to-r from-[#007BBD] to-[#005A8C] text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Add more Document
        </button>
      </div>

      {/* Document List */}
      <div className="grid gap-4">
        {(formData.documents || []).map((doc, index) => (
          <div
            key={index}
            className="relative border border-gray-300 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
          >
            {/* Remove entire document */}
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveDocument(index)}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-md hover:bg-red-700 hover:scale-110 transition-transform"
                title="Remove Document"
              >
                ✕
              </button>
            )}

            {/* Fields in 2-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Document Name Dropdown */}
              <div>
                <select
                  value={doc.name}
                  onChange={(e) => {
                    const updatedDocs = [...formData.documents];

                    updatedDocs[index].name = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      documents: updatedDocs,
                    }));

                    if (e.target.value) clearError(`documentName_${index}`);
                  }}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Document</option>
                  {documentOptions.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors[`documentName_${index}`] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[`documentName_${index}`]}
                  </p>
                )}
              </div>

              {/* Document Number */}
              <div>
                <input
                  type="text"
                  placeholder="Enter Document Number"
                  value={doc.number}
                  onChange={(e) => {
                    const updatedDocs = [...formData.documents];
                    updatedDocs[index].number = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      documents: updatedDocs,
                    }));
                    if (e.target.value) clearError(`documentNumber_${index}`);
                  }}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors[`documentNumber_${index}`] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[`documentNumber_${index}`]}
                  </p>
                )}
              </div>

              {/* File Upload */}
              <div>
                <label className="w-full flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                  <span className="text-sm text-gray-500">
                    {doc.image ? "Change File" : "Upload Image/PDF"}
                  </span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) handleFileUpload(file, index);
                    }}
                    className="hidden"
                  />
                </label>
                {errors[`documentImage_${index}`] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[`documentImage_${index}`]}
                  </p>
                )}
              </div>

              {/* Preview Section */}
              {doc.image && (
                <div className="flex items-center gap-2">
                  {doc.fileType === "application/pdf" ? ( // ✅ check MIME type
                    <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-md">
                      <span className="text-red-600 font-medium">📄 PDF</span>
                      <a
                        href={doc.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline text-xs"
                      >
                        View
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          const updatedDocs = [...formData.documents];
                          updatedDocs[index].image = "";
                          updatedDocs[index].fileType = "";
                          setFormData((prev) => ({
                            ...prev,
                            documents: updatedDocs,
                          }));
                        }}
                        className="ml-1 text-red-500 hover:text-red-700 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={doc.image}
                        alt="Document"
                        className="w-16 h-16 object-cover border rounded-md shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updatedDocs = [...formData.documents];
                          updatedDocs[index].image = "";
                          updatedDocs[index].fileType = "";
                          setFormData((prev) => ({
                            ...prev,
                            documents: updatedDocs,
                          }));
                        }}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center shadow hover:bg-red-700 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {uploading && (
        <p className="text-sm text-gray-500 animate-pulse">
          Uploading document...
        </p>
      )}

      {/* Global error if no documents */}
      {errors.documents && (
        <p className="text-red-500 text-sm mt-2">{errors.documents}</p>
      )}
    </div>
  );
};

export default DocumentsUpload;
