import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import Quiz from '@/app/models/Quiz';
import dbConnect from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    await dbConnect();

    // Clean up expired quizzes (handled automatically by MongoDB TTL index)

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const quizId = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 2);

    // Read file content
    const content = await file.text();

    // Create new quiz document
    const quiz = new Quiz({
      quizId,
      originalName: file.name,
      content,
      expiresAt,
      size: file.size,
    });

    await quiz.save();

    return NextResponse.json({
      quizId,
      shareUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/quiz/${quizId}`,
      expiresAt: expiresAt.toISOString(),
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process upload' },
      { status: 500 }
    );
  }
}
