import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// Helper functions
const getFilePath = (quizId: string) => path.join(UPLOAD_DIR, `${quizId}.json`);
const getMetaPath = (quizId: string) => path.join(UPLOAD_DIR, `${quizId}.meta.json`);

async function cleanupExpiredFiles() {
  try {
    const files = await fs.readdir(UPLOAD_DIR);
    const now = new Date();
    let deletedCount = 0;

    for (const file of files) {
      if (file.endsWith('.meta.json')) {
        const quizId = file.replace('.meta.json', '');
        const metaPath = getMetaPath(quizId);

        try {
          const metaData = JSON.parse(await fs.readFile(metaPath, 'utf-8'));

          if (new Date(metaData.expiresAt) < now) {
            // Delete both quiz file and metadata
            await Promise.allSettled([fs.unlink(getFilePath(quizId)), fs.unlink(metaPath)]);
            deletedCount++;
            console.log(`Deleted expired quiz: ${quizId}`);
          }
        } catch (error) {
          console.error(`Error processing ${file}:`, error);
        }
      }
    }

    return deletedCount;
  } catch (error) {
    console.error('Cleanup error:', error);
    return 0;
  }
}

export async function POST(request: Request) {
  try {
    // First clean up any expired files
    const deletedCount = await cleanupExpiredFiles();
    console.log(`Cleaned up ${deletedCount} expired files`);

    // Process new upload
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Generate unique ID
    const quizId = uuidv4();

    // Ensure upload directory exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    // Set expiration (2 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 2);

    // Save both file and metadata
    await Promise.all([
      fs.writeFile(getFilePath(quizId), Buffer.from(await file.arrayBuffer())),
      fs.writeFile(
        getMetaPath(quizId),
        JSON.stringify({
          originalName: file.name,
          createdAt: new Date().toISOString(),
          expiresAt: expiresAt.toISOString(),
          size: file.size,
        })
      ),
    ]);

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
