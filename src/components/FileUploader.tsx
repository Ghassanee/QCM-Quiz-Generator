'use client';
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface FileUploaderProps {
  onUploadSuccess: (shareUrl: string) => void;
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

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const FileUploaderContainer = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.6s ease-out;
  max-width: 600px;
  margin: 0 auto;

  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
  }
`;

const UploadArea = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: 0.75rem;
  padding: 3rem 2rem;
  text-align: center;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.cardBg};
  }
`;

const SampleSection = styled.div`
  margin-top: 30px;
  text-align: left;
  background: ${({ theme }) => theme.colors.explanationBg};
  padding: 15px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Pre = styled.pre`
  white-space: pre-wrap;
  background: ${({ theme }) => (theme.mode === 'light' ? '#f5f5f5' : '#0f172a')};
  color: ${({ theme }) => (theme.mode === 'light' ? '#0f172a' : '#f8fafc')};
  padding: 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  margin-top: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
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

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(99, 102, 241, 0.2);
  border-top: 4px solid #6366f1;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 20px auto;
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 2rem;
  animation: ${fadeIn} 0.6s ease-out;

  h2 {
    margin-bottom: 1.5rem;
  }
`;

const ShareLink = styled.div`
  background: ${({ theme }) => theme.colors.explanationBg};
  padding: 15px;
  border-radius: 8px;
  margin: 20px 0;
  word-break: break-all;
  font-family: monospace;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const GradientText = styled.span`
  background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${gradient} 3s ease infinite;
  font-weight: 600;
`;

const ExpirationNotice = styled.div`
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  animation: ${fadeIn} 0.6s ease-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &::before {
    content: '⏳';
    font-size: 1.5rem;
  }
`;

const ExpirationText = styled.p`
  margin: 0;
  font-size: 0.95rem;

  strong {
    font-weight: 600;
    text-decoration: underline;
  }
`;

const FileUploader: React.FC<FileUploaderProps> = ({ onUploadSuccess }) => {
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [shareLink, setShareLink] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError('');

    try {
      if (file.type !== 'application/json') {
        throw new Error('Please upload a JSON file');
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/quizzes', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const { shareUrl } = await response.json();
      setShareLink(shareUrl);
      onUploadSuccess(shareUrl);

      await navigator.clipboard.writeText(shareUrl);
    } catch (err) {
      setError(err.message || 'Failed to upload quiz');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <FileUploaderContainer>
      {isUploading ? (
        <div style={{ textAlign: 'center' }}>
          <GradientText>Processing your file...</GradientText>
          <LoadingSpinner />
          <p>This might take a few seconds</p>
        </div>
      ) : shareLink ? (
        <SuccessMessage>
          <h2>
            <GradientText>Upload Successful!</GradientText>
          </h2>
          <p>The share link has been copied to your clipboard</p>
          <ShareLink>{shareLink}</ShareLink>

          <ExpirationNotice>
            <ExpirationText>
              <strong>Note:</strong> This file will automatically expire and be deleted in{' '}
              <strong>2 days</strong>
            </ExpirationText>
          </ExpirationNotice>

          <UploadLabel onClick={() => navigator.clipboard.writeText(shareLink)}>
            Copy Again
          </UploadLabel>
        </SuccessMessage>
      ) : (
        <>
          <UploadArea>
            <h2>Upload QCM Quiz File</h2>
            <p>Drag and drop your JSON file here, or click to browse</p>
            <UploadLabel>
              Select File
              <FileInput
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
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
        </>
      )}
    </FileUploaderContainer>
  );
};

export default FileUploader;
