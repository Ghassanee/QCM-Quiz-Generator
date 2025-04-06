'use client';
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Question from './Question';
import { useRouter } from 'next/navigation';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

interface QuizProps {
  quizData: {
    title: string;
    description?: string;
    questions: Array<{
      id: number;
      question: string;
      multipleCorrect?: boolean;
      options: Array<{
        text: string;
        correct: boolean;
        explanation?: string;
      }>;
    }>;
  };
  onSubmit: (answers: { [key: number]: number[] }) => void; // Updated to accept array of selected options
  userAnswers: { [key: number]: number[] }; // Updated to store arrays
  reviewMode: boolean;
}

const QuizContainer = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease-out;
`;

const QuizTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

const QuizDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
`;

const ResultsSummary = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.explanationBg};
  border-radius: 0.75rem;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const QuizHeader = styled.div`
  margin-bottom: 2rem;
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  margin-top: 1.5rem;
  font-weight: 700;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ShareButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 700;
  width: 100%;
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const ResetButton = styled.button`
  background: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  margin-top: 1.5rem;
  font-weight: 700;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Quiz: React.FC<QuizProps> = ({ quizData, onSubmit, userAnswers, reviewMode }) => {
  const [currentAnswers, setCurrentAnswers] = useState<{ [key: number]: number[] }>(userAnswers);
  const router = useRouter();

  const handleOptionSelect = (questionId: number, optionIndex: number) => {
    if (reviewMode) return;

    setCurrentAnswers((prev) => {
      const question = quizData.questions.find((q) => q.id === questionId);
      const currentSelections = prev[questionId] || [];

      if (question?.multipleCorrect) {
        // For multiple correct questions, toggle the selection
        return {
          ...prev,
          [questionId]: currentSelections.includes(optionIndex)
            ? currentSelections.filter((idx) => idx !== optionIndex)
            : [...currentSelections, optionIndex],
        };
      } else {
        // For single answer questions, replace the selection
        return {
          ...prev,
          [questionId]: [optionIndex],
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(currentAnswers);
  };

  const resetQuiz = () => {
    router.push('/');
  };

  const calculateScore = (): number => {
    let score = 0;

    quizData.questions.forEach((question) => {
      const selectedIndices = currentAnswers[question.id] || [];
      const correctIndices = question.options
        .map((opt, idx) => (opt.correct ? idx : -1))
        .filter((idx) => idx !== -1);

      // For multiple correct questions, only count if ALL correct options are selected and NO incorrect ones
      if (question.multipleCorrect) {
        const allCorrectSelected = correctIndices.every((idx) => selectedIndices.includes(idx));
        const noIncorrectSelected = selectedIndices.every((idx) => question.options[idx].correct);
        if (allCorrectSelected && noIncorrectSelected) {
          score++;
        }
      }
      // For single answer questions
      else if (selectedIndices.length === 1 && question.options[selectedIndices[0]].correct) {
        score++;
      }
    });

    return score;
  };

  return (
    <QuizContainer>
      <QuizHeader>
        <QuizTitle>{quizData.title}</QuizTitle>
        {quizData.description && <QuizDescription>{quizData.description}</QuizDescription>}

        <ShareButton onClick={() => navigator.clipboard.writeText(window.location.href)}>
          Copy Quiz Link
        </ShareButton>
      </QuizHeader>

      <form onSubmit={handleSubmit}>
        {quizData.questions.map((question, index) => (
          <Question
            key={question.id}
            question={question}
            questionNumber={index + 1}
            selectedOptions={currentAnswers[question.id] || []}
            onSelect={handleOptionSelect}
            reviewMode={reviewMode}
          />
        ))}

        {!reviewMode && <SubmitButton type="submit">Submit Quiz</SubmitButton>}
        <ResetButton onClick={resetQuiz}>Load New Quiz</ResetButton>
      </form>

      {reviewMode && (
        <ResultsSummary>
          <h3>
            Your Score: {calculateScore()} / {quizData.questions.length}
          </h3>
          <p>Review your answers below. Correct answers are marked in green.</p>
        </ResultsSummary>
      )}
    </QuizContainer>
  );
};

export default Quiz;
