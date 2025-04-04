import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const quizId = uuidv4();
  // Save to database or file system
  res.status(200).json({
    shareUrl: `${process.env.NEXT_PUBLIC_URL}/quiz/${quizId}`,
  });
}
