'use client';
import FileUploader from '@/components/FileUploader';
import { Logo } from '@/components/Logo';
import Quiz from '@/components/Quiz';
import ThemeToggle from '@/components/ThemeToggle';
import { GlobalStyles } from '@/lib/styled-components';
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

interface QuizData {
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

const ResetButton = styled.button`
  padding: 10px 20px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 30px;
`;

const AppHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`;

function App() {
  return (
    <ThemeProvider>
      <ThemeContent />
    </ThemeProvider>
  );
}

const ThemeContent: React.FC = () => {
  const { theme } = useTheme();

  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});

  const handleQuizLoad = (data: QuizData) => {
    setQuizData(data);
    setShowResults(false);
    setUserAnswers({});
  };

  const handleQuizSubmit = (answers: UserAnswers) => {
    setUserAnswers(answers);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setQuizData(null);
    setShowResults(false);
    setUserAnswers({});
  };

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      <AppHeader>
        <Logo />
        <ThemeToggle />
      </AppHeader>

      <AppContainer>
        <Title>Quizmo</Title>
        {!quizData ? (
          <FileUploader onQuizLoad={handleQuizLoad} />
        ) : showResults ? (
          <div>
            <Quiz
              quizData={quizData}
              onSubmit={handleQuizSubmit}
              userAnswers={userAnswers}
              reviewMode={true}
            />
            <ResetButton onClick={resetQuiz}>Load New Quiz</ResetButton>
          </div>
        ) : (
          <Quiz
            quizData={quizData}
            onSubmit={handleQuizSubmit}
            userAnswers={userAnswers}
            reviewMode={false}
          />
        )}
      </AppContainer>
    </StyledThemeProvider>
  );
};

export default App;
