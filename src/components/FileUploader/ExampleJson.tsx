import { useState } from 'react';
import { CopyButton, Pre, SampleSection } from './styles';

const sampleJson = `{
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
}`;

export const ExampleJson = () => {
  const [copied, setCopied] = useState(false);

  const copySampleJson = () => {
    navigator.clipboard.writeText(sampleJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <SampleSection>
      <h3>Sample QCM Quiz File</h3>
      <CopyButton onClick={copySampleJson}>{copied ? 'Copied!' : 'Copy'}</CopyButton>
      <Pre>{sampleJson}</Pre>
    </SampleSection>
  );
};
