'use client';
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface FileUploaderProps {
  onQuizLoad: (data: any) => void;
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

const FileUploaderContainer = styled.div`
  background: ${({ theme }: any) => theme.colors.cardBg};
  color: ${({ theme }: any) => theme.colors.text};
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.6s ease-out;

  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
  }
`;

const UploadArea = styled.div`
  border: 2px dashed ${({ theme }: any) => theme.colors.border};
  border-radius: 0.75rem;
  padding: 3rem 2rem;
  text-align: center;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }: any) => theme.colors.primary};
    background: ${({ theme }: any) => theme.colors.cardBg};
  }
`;

const SampleSection = styled.div`
  margin-top: 30px;
  text-align: left;
  background: ${({ theme }: any) => theme.colors.explanationBg};
  padding: 15px;
  border-radius: 8px;
  border: 1px solid ${({ theme }: any) => theme.colors.border};
`;

const Pre = styled.pre`
  white-space: pre-wrap;
  background: ${({ theme }: any) => (theme.mode === 'light' ? '#f5f5f5' : '#0f172a')};
  color: ${({ theme }: any) => (theme.mode === 'light' ? '#0f172a' : '#f8fafc')};
  padding: 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  margin-top: 8px;
  border: 1px solid ${({ theme }: any) => theme.colors.border};
`;

const FileInput = styled.input`
  display: none;
`;

const UploadLabel = styled.label`
  display: inline-block;
  background: #6366f1;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  animation: ${pulse} 2s infinite;

  &:hover {
    background: #4f46e5;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ErrorMessage = styled.div`
  color: #f44336;
  margin: 10px 0;
  text-align: center;
`;

const FileUploader: React.FC<FileUploaderProps> = ({ onQuizLoad }) => {
  const [error, setError] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const quizData = JSON.parse(e.target?.result as string);
        if (!quizData.questions || !Array.isArray(quizData.questions)) {
          throw new Error('Invalid quiz format');
        }
        onQuizLoad(quizData);
        setError('');
      } catch (err) {
        setError('Invalid JSON file. Please upload a valid QCM quiz file.');
        console.error(err);
      }
    };
    reader.readAsText(file);
  };

  return (
    <FileUploaderContainer>
      <UploadArea>
        <h2>Upload QCM Quiz File</h2>
        <p>Drag and drop your JSON file here, or click to browse</p>
        <UploadLabel>
          Select File
          <FileInput type="file" accept=".json" onChange={handleFileUpload} />
        </UploadLabel>
      </UploadArea>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <SampleSection>
        <h3>Sample QCM Quiz File</h3>
        <Pre>{`{
  "title": "Sample Quiz",
  "description": "This is a sample quiz",
  "questions": [
    {
      "id": 1,
      "question": "Sample question?",
      "options": [
        {"text": "Option 1", "correct": false},
        {"text": "Option 2", "correct": true, "explanation": "Explanation..."}
      ]
    }
  ]
}`}</Pre>
      </SampleSection>
    </FileUploaderContainer>
  );
};

export default FileUploader;
