'use client';
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Question from './Question';

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
      options: Array<{
        text: string;
        correct: boolean;
        explanation?: string;
      }>;
    }>;
  };
  onSubmit: (answers: { [key: number]: number }) => void;
  userAnswers: { [key: number]: number };
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
  color: ${({ theme }) => (theme.mode === 'light' ? '#64748b' : '#cbd5e1')};
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

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Quiz: React.FC<QuizProps> = ({ quizData, onSubmit, userAnswers, reviewMode }) => {
  const [currentAnswers, setCurrentAnswers] = useState<{ [key: number]: number }>(userAnswers);

  const handleOptionSelect = (questionId: number, optionIndex: number) => {
    if (reviewMode) return;

    setCurrentAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(currentAnswers);
  };

  const calculateScore = (): number => {
    let score = 0;
    quizData.questions.forEach((question) => {
      const selectedOptionIndex = currentAnswers[question.id];
      if (selectedOptionIndex !== undefined && question.options[selectedOptionIndex].correct) {
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
      </QuizHeader>

      <form onSubmit={handleSubmit}>
        {quizData.questions.map((question, index) => (
          <Question
            key={question.id}
            question={question}
            questionNumber={index + 1}
            selectedOption={currentAnswers[question.id]}
            onSelect={handleOptionSelect}
            reviewMode={reviewMode}
          />
        ))}

        {!reviewMode && <SubmitButton type="submit">Submit Quiz</SubmitButton>}
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
