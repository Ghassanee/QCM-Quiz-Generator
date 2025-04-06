'use client';
import Quiz from '@/components/Quiz';
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ThemeProvider } from '@/context/ThemeContext';
import { useRouter } from 'next/navigation';
import FileUploader from '@/components/FileUploader/FileUploader';

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
  [key: number]: number[];
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

function App() {
  return (
    <ThemeProvider>
      <ThemeContent />
    </ThemeProvider>
  );
}

const ThemeContent: React.FC = () => {
  const router = useRouter(); // Initialize the router
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});

  const handleUploadSuccess = (shareUrl: string) => {
    setShowResults(false);
    setUserAnswers({});
    setQuizData(null);
    // Redirect to the shared quiz URL
    router.push(shareUrl);
  };

  const handleQuizSubmit = (answers: UserAnswers) => {
    setUserAnswers(answers);
    setShowResults(true);
  };

  return (
    <AppContainer>
      {!quizData ? (
        <FileUploader onUploadSuccess={handleUploadSuccess} />
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

export default App;
