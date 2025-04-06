import mongoose, { Schema, Document } from 'mongoose';

export interface IQuiz extends Document {
  quizId: string;
  originalName: string;
  content: string;
  createdAt: Date;
  expiresAt: Date;
  size: number;
}

const QuizSchema: Schema = new Schema({
  quizId: { type: String, required: true, unique: true },
  originalName: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  size: { type: Number, required: true },
});

// Add TTL index for automatic expiration
QuizSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.Quiz || mongoose.model<IQuiz>('Quiz', QuizSchema);
