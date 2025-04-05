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
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  const filePath = path.join(uploadDir, `${id}.json`);
  const metaPath = path.join(uploadDir, `${id}.meta.json`);

  try {
    // Check metadata first
    const metaData = JSON.parse(await readFile(metaPath, 'utf-8'));
    const now = new Date();

    if (new Date(metaData.expiresAt) < now) {
      // Delete expired files
      await Promise.allSettled([
        readFile(filePath)
          .then(() =>
            // Only delete if file exists
            Promise.all([
              import('fs/promises').then((fs) => fs.unlink(filePath)),
              import('fs/promises').then((fs) => fs.unlink(metaPath)),
            ])
          )
          .catch(() => {}),
      ]);

      return (
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold">Quiz Expired</h1>
          <p className="mt-2">This quiz was only available for 2 days and has now been removed.</p>
        </div>
      );
    }

    // Load and display the quiz
    const fileContents = await readFile(filePath, 'utf8');
    const quizData: QuizData = JSON.parse(fileContents);

    return <PageQuiz quizData={quizData} />;
  } catch (error) {
    console.error('Error loading quiz:', error);
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Quiz Not Found</h1>
        <p className="mt-2">
          {error instanceof Error && error.message.includes('ENOENT')
            ? "The requested quiz doesn't exist or has been removed."
            : 'An error occurred while loading the quiz.'}
        </p>
      </div>
    );
  }
}

export default QuizPage;
