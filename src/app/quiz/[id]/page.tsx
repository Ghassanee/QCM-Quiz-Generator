// src/app/quiz/[id]/page.tsx
import { PageQuiz } from '@/components/PageQuiz';
import { readFile } from 'fs/promises';
import path from 'path';

export interface QuizData {
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

interface QuizPageProps {
  params: Promise<{ id: string }>;
}

async function QuizPage({ params }: QuizPageProps) {
  const { id } = await params;
  try {
    const filePath = path.join(process.cwd(), 'public', 'uploads', `${id}.json`);
    const fileContents = await readFile(filePath, 'utf8');
    const quizData: QuizData = JSON.parse(fileContents);

    return <PageQuiz quizData={quizData} />;
  } catch (error) {
    console.error('Error loading quiz:', error);
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Quiz Not Found</h1>
        <p>The requested quiz could not be loaded.</p>
      </div>
    );
  }
}

export default QuizPage; // ✅ Ensure you're exporting the function, not calling it
