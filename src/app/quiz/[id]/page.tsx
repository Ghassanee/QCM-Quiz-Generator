import { PageQuiz } from '@/components/PageQuiz';
import Quiz from '@/components/Quiz';
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

export default async function QuizPage({ params }: { params: { id: string } }) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'uploads', `${params.id}.json`);
    const fileContents = await readFile(filePath, 'utf8');
    const quizData: QuizData = JSON.parse(fileContents);

    return <PageQuiz quizData={quizData} />;
  } catch (error) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Quiz Not Found</h1>
        <p>The requested quiz could not be loaded.</p>
      </div>
    );
  }
}
