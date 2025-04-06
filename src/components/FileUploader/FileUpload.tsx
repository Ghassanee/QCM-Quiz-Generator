import React from 'react';
import { TabComponentProps } from './types';
import { UploadArea, UploadLabel, FileInput } from './styles';

const FileUpload: React.FC<TabComponentProps> = ({ isUploading, onUpload, setError }) => {
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const content = await file.text();
      await onUpload(content, file.name);
    } catch (err) {
      setError(err.message || 'Failed to read file');
    }
  };

  return (
    <UploadArea>
      <h2>Upload QCM Quiz File</h2>
      <p>Drag and drop your JSON file here, or click to browse</p>
      <UploadLabel>
        Select File
        <FileInput type="file" accept=".json" onChange={handleFileUpload} disabled={isUploading} />
      </UploadLabel>
    </UploadArea>
  );
};

export default FileUpload;
