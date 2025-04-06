// src/app/quiz/[id]/page.tsx
import Quiz from '@/app/models/Quiz';
import { PageQuiz } from '@/components/PageQuiz';
import dbConnect from '@/lib/mongodb';

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
  params: { id: string };
}

async function QuizPage({ params }: QuizPageProps) {
  const { id } = params;

  try {
    await dbConnect();

    // Find the quiz in MongoDB
    const quiz = await Quiz.findOne({ quizId: id });

    if (!quiz) {
      return (
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold">Quiz Not Found</h1>
          <p className="mt-2">The requested quiz doesn't exist or has been removed.</p>
        </div>
      );
    }

    // Check if quiz is expired (though MongoDB TTL should handle this)
    const now = new Date();
    if (new Date(quiz.expiresAt) < now) {
      return (
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold">Quiz Expired</h1>
          <p className="mt-2">This quiz was only available for 2 days and has now been removed.</p>
        </div>
      );
    }

    // Parse and display the quiz
    const quizData: QuizData = JSON.parse(quiz.content);
    return <PageQuiz quizData={quizData} />;
  } catch (error) {
    console.error('Error loading quiz:', error);
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Error Loading Quiz</h1>
        <p className="mt-2">An error occurred while loading the quiz. Please try again later.</p>
      </div>
    );
  }
}

export default QuizPage;
