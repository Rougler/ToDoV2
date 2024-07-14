// FileUploadModal.js
import React from 'react';
import './FileUploadModal.css'; // Create this CSS file for styling

const FileUploadModal = ({ onClose, onFileChange }) => {
  return (
    <div className="file-upload-modal">
      <div className="file-upload-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Attach a file from your computer</h2>
        <input
          type="file"
          onChange={onFileChange}
          multiple
        />
      </div>
    </div>
  );
};

export default FileUploadModal;
