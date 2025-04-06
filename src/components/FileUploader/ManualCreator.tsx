import React, { useState } from 'react';
import { TabComponentProps } from './types';
import styled from 'styled-components';
import {
  AddButton,
  FormContainer,
  FormGroup,
  FormInput,
  FormLabel,
  FormTextarea,
  OptionCheckbox,
  OptionInput,
  OptionItem,
  QuestionCard,
  QuestionHeader,
  QuestionsContainer,
  RemoveButton,
  UploadLabel,
} from './styles';

const ManualCreator: React.FC<TabComponentProps> = ({ isUploading, onUpload, setError }) => {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: '',
      options: [
        { text: '', correct: false },
        { text: '', correct: false },
      ],
    },
  ]);

  const addQuestion = () => {
    const newId = questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1;
    setQuestions([
      ...questions,
      {
        id: newId,
        question: '',
        options: [
          { text: '', correct: false },
          { text: '', correct: false },
        ],
      },
    ]);
  };

  const removeQuestion = (id: number) => {
    if (questions.length <= 1) {
      setError('A quiz must have at least one question');
      return;
    }
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestion = (id: number, field: string, value: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)));
  };

  const addOption = (questionId: number) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, options: [...q.options, { text: '', correct: false }] } : q
      )
    );
  };

  const removeOption = (questionId: number, optionIndex: number) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.filter((_, index) => index !== optionIndex),
            }
          : q
      )
    );
  };

  const updateOption = (questionId: number, optionIndex: number, field: string, value: any) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, idx) =>
                idx === optionIndex ? { ...opt, [field]: value } : opt
              ),
            }
          : q
      )
    );
  };

  const handleManualCreate = async () => {
    // Basic validation
    if (!quizTitle.trim()) {
      setError('Quiz title is required');
      return;
    }

    for (const q of questions) {
      if (!q.question.trim()) {
        setError(`Question #${questions.indexOf(q) + 1} text is required`);
        return;
      }

      for (const opt of q.options) {
        if (!opt.text.trim()) {
          setError(
            `Option ${q.options.indexOf(opt) + 1} in Question #${
              questions.indexOf(q) + 1
            } is required`
          );
          return;
        }
      }

      if (!q.options.some((opt) => opt.correct)) {
        setError(`Question #${questions.indexOf(q) + 1} must have at least one correct option`);
        return;
      }
    }

    const quizData = {
      title: quizTitle,
      description: quizDescription,
      questions: questions.map((q) => ({
        id: q.id,
        question: q.question,
        options: q.options.map((opt) => ({
          text: opt.text,
          correct: opt.correct,
        })),
      })),
    };

    await onUpload(JSON.stringify(quizData, null, 2));
  };

  return (
    <FormContainer>
      <h2>Create Quiz Manually</h2>

      <FormGroup>
        <FormLabel>Quiz Title *</FormLabel>
        <FormInput
          type="text"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          placeholder="Enter quiz title"
          required
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>Description</FormLabel>
        <FormTextarea
          value={quizDescription}
          onChange={(e) => setQuizDescription(e.target.value)}
          placeholder="Enter quiz description (optional)"
        />
      </FormGroup>

      <QuestionsContainer>
        <h3>Questions</h3>
        {questions.map((q) => (
          <QuestionCard key={q.id}>
            <QuestionHeader>
              <h4>Question #{questions.findIndex((item) => item.id === q.id) + 1}</h4>
              {questions.length > 1 && (
                <RemoveButton onClick={() => removeQuestion(q.id)}>×</RemoveButton>
              )}
            </QuestionHeader>

            <FormGroup>
              <FormLabel>Question Text *</FormLabel>
              <FormTextarea
                value={q.question}
                onChange={(e) => updateQuestion(q.id, 'question', e.target.value)}
                placeholder="Enter the question"
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Options *</FormLabel>
              {q.options.map((opt, optIndex) => (
                <OptionItem key={optIndex}>
                  <OptionCheckbox
                    type="checkbox"
                    checked={opt.correct}
                    onChange={(e) => updateOption(q.id, optIndex, 'correct', e.target.checked)}
                  />
                  <OptionInput
                    type="text"
                    value={opt.text}
                    onChange={(e) => updateOption(q.id, optIndex, 'text', e.target.value)}
                    placeholder={`Option ${optIndex + 1}`}
                    required
                  />
                  {q.options.length > 2 && (
                    <RemoveButton onClick={() => removeOption(q.id, optIndex)}>×</RemoveButton>
                  )}
                </OptionItem>
              ))}
              <AddButton onClick={() => addOption(q.id)}>Add Option</AddButton>
            </FormGroup>
          </QuestionCard>
        ))}

        <AddButton onClick={addQuestion}>Add Question</AddButton>
      </QuestionsContainer>

      <UploadLabel
        as="button"
        onClick={handleManualCreate}
        style={{ marginTop: '2rem' }}
        disabled={isUploading}
      >
        Create Quiz
      </UploadLabel>
    </FormContainer>
  );
};

export default ManualCreator;
