import React from 'react';
import '../styles/FileUploadModal.css'; 

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
