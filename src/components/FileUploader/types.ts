export interface FileUploaderProps {
  onUploadSuccess: (shareUrl: string) => void;
}

export interface QuizData {
  title: string;
  description?: string;
  questions: Question[];
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
}

export interface Option {
  text: string;
  correct: boolean;
  explanation?: string;
}

export interface TabComponentProps {
  isUploading: boolean;
  onUpload: (data: string, fileName?: string) => Promise<void>;
  setError: (message: string) => void;
}
