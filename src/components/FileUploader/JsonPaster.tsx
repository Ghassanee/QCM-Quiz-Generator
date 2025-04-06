import React, { useState } from 'react';
import { TabComponentProps } from './types';
import { PasteArea, UploadLabel } from './styles';

const JsonPaster: React.FC<TabComponentProps> = ({ isUploading, onUpload, setError }) => {
  const [jsonContent, setJsonContent] = useState('');

  const handlePasteUpload = async () => {
    if (!jsonContent.trim()) {
      setError('Please paste your JSON content');
      return;
    }
    await onUpload(jsonContent);
  };

  return (
    <div>
      <h2>Paste QCM Quiz JSON</h2>
      <PasteArea
        placeholder={`Paste your JSON content here...\n\nExample:\n{\n  "title": "My Quiz",\n  "questions": [\n    {\n      "question": "Sample question?",\n      "options": [\n        {"text": "Option 1", "correct": false},\n        {"text": "Option 2", "correct": true}\n      ]\n    }\n  ]\n}`}
        value={jsonContent}
        onChange={(e) => setJsonContent(e.target.value)}
      />
      <UploadLabel as="button" onClick={handlePasteUpload} disabled={isUploading}>
        Upload Pasted Content
      </UploadLabel>
    </div>
  );
};

export default JsonPaster;
