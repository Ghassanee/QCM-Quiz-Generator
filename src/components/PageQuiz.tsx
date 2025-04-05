'use client';
import Quiz from '@/components/Quiz';
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { QuizData } from '@/app/quiz/[id]/page';

interface PageQuizProps {
  quizData: QuizData;
}

interface UserAnswers {
  [key: number]: number;
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  position: relative;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.6s ease-out;
`;

export const PageQuiz: React.FC<PageQuizProps> = ({ quizData }) => {
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});

  const handleQuizSubmit = (answers: UserAnswers) => {
    setUserAnswers(answers);
    setShowResults(true);
  };

  return (
    <AppContainer>
      {!quizData ? (
        <Title> Quiz not found</Title>
      ) : showResults ? (
        <div>
          <Quiz
            quizData={quizData}
            onSubmit={handleQuizSubmit}
            userAnswers={userAnswers}
            reviewMode={true}
          />
        </div>
      ) : (
        <div>
          <Quiz
            quizData={quizData}
            onSubmit={handleQuizSubmit}
            userAnswers={userAnswers}
            reviewMode={false}
          />
        </div>
      )}
    </AppContainer>
  );
};
