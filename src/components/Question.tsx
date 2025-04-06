import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

interface QuestionProps {
  question: {
    id: number;
    question: string;
    options: Array<{
      text: string;
      correct: boolean;
      explanation?: string;
    }>;
    multipleCorrect?: boolean; // New field to indicate multiple correct answers
  };
  questionNumber: number;
  selectedOptions?: number[]; // Changed from selectedOption to selectedOptions (array)
  onSelect: (questionId: number, optionIndex: number) => void;
  reviewMode: boolean;
}

const QuestionContainer = styled.div<{
  $isCorrect?: boolean;
  $isIncorrect?: boolean;
}>`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.6s ease-out;

  ${({ $isCorrect }) =>
    $isCorrect &&
    css`
      border-left: 4px solid ${({ theme }) => theme.colors.success};
      padding-left: 1rem;
    `}

  ${({ $isIncorrect }) =>
    $isIncorrect &&
    css`
      border-left: 4px solid ${({ theme }) => theme.colors.error};
      padding-left: 1rem;
    `}
`;

const QuestionText = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

const OptionItem = styled.div<{
  $isCorrect?: boolean;
  $isIncorrect?: boolean;
  $isSelected?: boolean;
}>`
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  cursor: pointer;
  background: ${({ $isCorrect, $isIncorrect, $isSelected, theme }) => {
    if ($isCorrect) return '#d1fae5';
    if ($isIncorrect) return '#fee2e2';
    if ($isSelected) return theme.mode === 'light' ? '#e0e7ff' : '#3730a3';
    return 'transparent';
  }};
  border-left: ${({ $isCorrect, $isIncorrect }) => {
    if ($isCorrect) return '3px solid #10b981';
    if ($isIncorrect) return '3px solid #ef4444';
    return 'none';
  }};
  color: ${({ theme, $isCorrect, $isIncorrect }) => {
    if ($isCorrect) return theme.colors.highlightOption;
    if ($isIncorrect) return theme.colors.error;
    return theme.colors.text;
  }};

  &:hover {
    background: ${({ theme, $isCorrect, $isIncorrect }) => {
      if ($isCorrect || $isIncorrect) return;
      return theme.mode === 'light' ? '#f1f5f9' : '#334155';
    }};
  }
`;

const ExplanationText = styled.div`
  background: ${({ theme }) => theme.colors.explanationBg};
  color: ${({ theme }) => theme.colors.explanationText};
  padding: 0.75rem;
  border-radius: 0.375rem;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  border-left: 3px solid ${({ theme }) => theme.colors.border};
`;

const StatusIndicator = styled.span<{ $isCorrect: boolean }>`
  margin-left: 0.5rem;
  font-size: 1rem;
  color: ${({ $isCorrect }) => ($isCorrect ? '#10b981' : '#ef4444')};
`;

const OptionsContainer = styled.div`
  margin-left: 0.5rem;
`;

const OptionLabel = styled.label<{ $reviewMode: boolean }>`
  display: flex;
  align-items: center;
  cursor: ${({ $reviewMode }) => ($reviewMode ? 'default' : 'pointer')};
`;

const OptionInput = styled.input`
  margin-right: 10px;
`;

const MultipleSelectNotice = styled.div`
  background: ${({ theme }) => theme.colors.explanationBg};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  display: inline-block;
`;

const Question: React.FC<QuestionProps> = ({
  question,
  questionNumber,
  selectedOptions = [],
  onSelect,
  reviewMode,
}) => {
  // Determine if all correct options are selected
  const correctOptionIndices = question.options
    .map((opt, idx) => (opt.correct ? idx : -1))
    .filter((idx) => idx !== -1);

  const allCorrectSelected = correctOptionIndices.every((idx) => selectedOptions.includes(idx));
  const anyIncorrectSelected = selectedOptions.some((idx) => !question.options[idx].correct);

  const isFullyCorrect = reviewMode && allCorrectSelected && !anyIncorrectSelected;
  const isPartiallyCorrect =
    reviewMode && selectedOptions.some((idx) => question.options[idx].correct);

  return (
    <QuestionContainer
      $isCorrect={isFullyCorrect}
      $isIncorrect={reviewMode && !isFullyCorrect && selectedOptions.length > 0}
    >
      <QuestionText>
        {questionNumber}. {question.question}
        {reviewMode && (
          <StatusIndicator $isCorrect={isFullyCorrect}>
            {isFullyCorrect ? ' ✓' : isPartiallyCorrect ? ' ~' : ' ✗'}
          </StatusIndicator>
        )}
      </QuestionText>

      {question.multipleCorrect && (
        <MultipleSelectNotice>
          Select all that apply (multiple correct answers)
        </MultipleSelectNotice>
      )}

      <OptionsContainer>
        {question.options.map((option, index) => {
          const isOptionCorrect = reviewMode && option.correct;
          const isOptionIncorrect =
            reviewMode && selectedOptions.includes(index) && !option.correct;
          const isSelected = selectedOptions.includes(index);

          return (
            <OptionItem
              key={index}
              $isCorrect={isOptionCorrect}
              $isIncorrect={isOptionIncorrect}
              $isSelected={isSelected && !reviewMode}
              onClick={() => !reviewMode && onSelect(question.id, index)}
            >
              <OptionLabel $reviewMode={reviewMode}>
                <OptionInput
                  type={question.multipleCorrect ? 'checkbox' : 'radio'}
                  name={`question-${question.id}`}
                  checked={selectedOptions.includes(index)}
                  onChange={() => {}}
                  disabled={reviewMode}
                />
                {option.text}
              </OptionLabel>

              {reviewMode && option.correct && option.explanation && (
                <ExplanationText>
                  <strong>Explanation:</strong> {option.explanation}
                </ExplanationText>
              )}
            </OptionItem>
          );
        })}
      </OptionsContainer>
    </QuestionContainer>
  );
};

export default Question;
