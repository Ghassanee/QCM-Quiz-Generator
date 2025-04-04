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
  };
  questionNumber: number;
  selectedOption?: number;
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
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

const OptionItem = styled.div<{
  $isCorrect?: boolean;
  $isIncorrect?: boolean;
}>`
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  cursor: pointer;
  background: ${({ $isCorrect, $isIncorrect }) => {
    if ($isCorrect) return '#d1fae5';
    if ($isIncorrect) return '#fee2e2';
    return 'transparent';
  }};
  border-left: ${({ $isCorrect, $isIncorrect }) => {
    if ($isCorrect) return '3px solid #10b981';
    if ($isIncorrect) return '3px solid #ef4444';
    return 'none';
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
  color: ${({ theme }) => (theme.mode === 'light' ? '#475569' : '#cbd5e1')};
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

const Question: React.FC<QuestionProps> = ({
  question,
  questionNumber,
  selectedOption,
  onSelect,
  reviewMode,
}) => {
  const correctOptionIndex = question.options.findIndex((opt) => opt.correct);
  const isCorrect = reviewMode && selectedOption === correctOptionIndex;

  return (
    <QuestionContainer
      $isCorrect={reviewMode && isCorrect}
      $isIncorrect={reviewMode && !isCorrect && selectedOption !== undefined}
    >
      <QuestionText>
        {questionNumber}. {question.question}
        {reviewMode && (
          <StatusIndicator $isCorrect={isCorrect}>{isCorrect ? ' ✓' : ' ✗'}</StatusIndicator>
        )}
      </QuestionText>

      <OptionsContainer>
        {question.options.map((option, index) => {
          const isOptionCorrect = reviewMode && option.correct;
          const isOptionIncorrect = reviewMode && index === selectedOption && !option.correct;

          return (
            <OptionItem
              key={index}
              $isCorrect={isOptionCorrect}
              $isIncorrect={isOptionIncorrect}
              onClick={() => !reviewMode && onSelect(question.id, index)}
            >
              <OptionLabel $reviewMode={reviewMode}>
                <OptionInput
                  type="radio"
                  name={`question-${question.id}`}
                  checked={selectedOption === index}
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
