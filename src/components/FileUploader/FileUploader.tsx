'use client';
import React, { useState } from 'react';
import {
  ErrorMessage,
  ExpirationNotice,
  ExpirationText,
  FileUploaderContainer,
  GradientText,
  LoadingSpinner,
  Pre,
  SampleSection,
  ShareLink,
  SuccessMessage,
  TabButton,
  TabContainer,
  UploadLabel,
} from './styles';
import FileUpload from './FileUpload';
import JsonPaster from './JsonPaster';
import ManualCreator from './ManualCreator';

interface FileUploaderProps {
  onUploadSuccess: (shareUrl: string) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUploadSuccess }) => {
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'paste' | 'manual'>('upload');

  const validateQuizJSON = (jsonString: string): boolean => {
    try {
      // remove comments from the JSON string

      const data = JSON.parse(jsonString);
      console.log(data);

      // Basic structure validation
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid JSON structure');
      }

      // Check required fields
      if (!data.title || typeof data.title !== 'string') {
        throw new Error('Quiz must have a title string');
      }

      // Validate questions array
      if (!Array.isArray(data.questions) || data.questions.length === 0) {
        throw new Error('Quiz must have at least one question');
      }

      // Validate each question
      data.questions.forEach((question: any, index: number) => {
        if (typeof question.id !== 'number') {
          throw new Error(`Question ${index + 1} must have a numeric id`);
        }

        if (!question.question || typeof question.question !== 'string') {
          throw new Error(`Question ${index + 1} must have a question text`);
        }

        // Validate options
        if (!Array.isArray(question.options) || question.options.length < 2) {
          throw new Error(`Question ${index + 1} must have at least 2 options`);
        }

        // Check at least one correct option
        const hasCorrectOption = question.options.some((opt: any) => opt.correct);
        if (!hasCorrectOption) {
          throw new Error(`Question ${index + 1} must have at least one correct option`);
        }

        // Validate each option
        question.options.forEach((option: any, optIndex: number) => {
          if (!option.text || typeof option.text !== 'string') {
            throw new Error(`Question ${index + 1}, Option ${optIndex + 1} must have text`);
          }
          if (typeof option.correct !== 'boolean') {
            throw new Error(
              `Question ${index + 1}, Option ${optIndex + 1} must specify correct (boolean)`
            );
          }
        });
      });

      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  };

  const uploadData = async (data: string, fileName: string = 'quiz.json') => {
    setIsUploading(true);
    setError('');

    try {
      // First validate the JSON structure
      if (!validateQuizJSON(data)) {
        setIsUploading(false);
        return;
      }

      const formData = new FormData();
      const blob = new Blob([data], { type: 'application/json' });
      formData.append('file', blob, fileName);

      const response = await fetch('/api/quizzes', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      const { shareUrl } = await response.json();
      setShareLink(shareUrl);
      onUploadSuccess(shareUrl);

      await navigator.clipboard.writeText(shareUrl);
    } catch (err: any) {
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
          <TabContainer $activeTab={['paste', 'upload', 'manual'].indexOf(activeTab)}>
            <TabButton $active={activeTab === 'paste'} onClick={() => setActiveTab('paste')}>
              Paste JSON
            </TabButton>
            <TabButton $active={activeTab === 'upload'} onClick={() => setActiveTab('upload')}>
              Upload File
            </TabButton>
            <TabButton $active={activeTab === 'manual'} onClick={() => setActiveTab('manual')}>
              Manual Creator
            </TabButton>
          </TabContainer>

          {activeTab === 'upload' ? (
            <FileUpload isUploading={isUploading} onUpload={uploadData} setError={setError} />
          ) : activeTab === 'paste' ? (
            <JsonPaster isUploading={isUploading} onUpload={uploadData} setError={setError} />
          ) : (
            <ManualCreator isUploading={isUploading} onUpload={uploadData} setError={setError} />
          )}

          {error && <ErrorMessage>{error}</ErrorMessage>}

          {activeTab !== 'manual' && (
            <SampleSection>
              <h3>Sample QCM Quiz File</h3>
              <Pre>{`{
  "title": "Sample Quiz",  // Required
  "description": "Optional description",
  "questions": [          // At least one required
    {
      "id": 1,            // Required, must be unique
      "question": "Sample question?",  // Required
      "multipleCorrect": false,  // Optional, defaults to false
      "options": [        // At least 2 required
        {
          "text": "Option 1",  // Required
          "correct": false,    // Required (boolean)
          "explanation": "Optional explanation"
        },
        {
          "text": "Option 2",
          "correct": true     // At least one correct required
        }
      ]
    }
  ]
}`}</Pre>
            </SampleSection>
          )}
        </>
      )}
    </FileUploaderContainer>
  );
};

export default FileUploader;
