import styled, { keyframes, css } from 'styled-components';

// Enhanced Animations
export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
  70% { transform: scale(1.02); box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
`;

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

// Glassmorphism effect mixin
const glassEffect = css`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

// Main Container
export const FileUploaderContainer = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: ${fadeIn} 0.8s ease-out;
  max-width: 650px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
    z-index: 0;
  }

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

// Upload Area
export const UploadArea = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  padding: 3.5rem 2rem;
  text-align: center;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  position: relative;
  ${glassEffect}

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: rgba(99, 102, 241, 0.05);
    transform: translateY(-3px);
  }

  &:after {
    content: '📁';
    position: absolute;
    font-size: 3rem;
    opacity: 0.2;
    right: 2rem;
    bottom: 1rem;
    animation: ${float} 4s ease-in-out infinite;
  }
`;

// Sample Section
export const SampleSection = styled.div`
  margin-top: 2.5rem;
  text-align: left;
  background: ${({ theme }) => theme.colors.explanationBg};
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, #6366f1, #8b5cf6);
  }
`;

export const Pre = styled.pre`
  white-space: pre-wrap;
  background: ${({ theme }) => (theme.mode === 'light' ? '#f8fafc' : '#0f172a')};
  color: ${({ theme }) => (theme.mode === 'light' ? '#0f172a' : '#f8fafc')};
  padding: 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-top: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  line-height: 1.6;
  font-family: 'Fira Code', monospace;
  position: relative;

  &:before {
    content: 'JSON';
    position: absolute;
    top: -10px;
    left: 10px;
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    padding: 0 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
  }
`;

// File Input
export const FileInput = styled.input`
  display: none;
`;

// Upload Label
export const UploadLabel = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 0.85rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${pulse} 3s infinite;
  box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);
  position: relative;
  overflow: hidden;
  border: none;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: 0.5s;
  }

  &:hover {
    background: linear-gradient(135deg, #8b5cf6, #6366f1);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(99, 102, 241, 0.3);

    &:before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

// Error Message
export const ErrorMessage = styled.div`
  color: #ff4d4f;
  margin: 1.25rem 0;
  text-align: center;
  padding: 1rem;
  background: rgba(255, 77, 79, 0.1);
  border-radius: 0.5rem;
  border-left: 4px solid #ff4d4f;
  animation: ${fadeIn} 0.3s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

// Loading Spinner
export const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(99, 102, 241, 0.1);
  border-top: 4px solid #6366f1;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 2rem auto;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border: 4px solid transparent;
    border-top-color: #8b5cf6;
    border-radius: 50%;
    animation: ${spin} 2s linear infinite;
  }
`;

// Success Message
export const SuccessMessage = styled.div`
  text-align: center;
  padding: 2.5rem;
  animation: ${fadeIn} 0.6s ease-out;
  ${glassEffect}
  border-radius: 1rem;

  h2 {
    margin-bottom: 1.5rem;
    font-size: 1.75rem;
  }
`;

// Share Link
export const ShareLink = styled.div`
  background: ${({ theme }) => theme.colors.explanationBg};
  padding: 1.25rem;
  border-radius: 0.75rem;
  margin: 1.5rem 0;
  word-break: break-all;
  font-family: 'Fira Code', monospace;
  border: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

// Gradient Text
export const GradientText = styled.span`
  background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${gradient} 3s ease infinite;
  font-weight: 700;
  display: inline-block;
`;

// Expiration Notice
export const ExpirationNotice = styled.div`
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 1.25rem;
  border-radius: 0.75rem;
  margin: 2rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: ${fadeIn} 0.6s ease-out;
  box-shadow: 0 8px 16px rgba(99, 102, 241, 0.2);

  &::before {
    content: '⏳';
    font-size: 1.75rem;
    animation: ${pulse} 2s infinite;
  }
`;

export const ExpirationText = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;

  strong {
    font-weight: 600;
    text-decoration: underline;
  }
`;

// Tabs
export const TabContainer = styled.div<{ $activeTab: number }>`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 2rem;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    height: 2px;
    width: 33.33%;
    background: ${({ theme }) => theme.colors.primary};
    transition: all 0.3s ease;
    transform: translateX(${({ $activeTab }: any) => $activeTab * 100}%);
  }
`;

export const TabButton = styled.button<{ $active: boolean }>`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
  position: relative;
  transition: all 0.3s ease;
  flex: 1;
  text-align: center;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: rgba(99, 102, 241, 0.05);
  }

  ${({ $active }) =>
    $active &&
    css`
      &:after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 50%;
        transform: translateX(-50%);
        width: 20px;
        height: 3px;
        background: ${({ theme }) => theme.colors.primary};
        border-radius: 3px 3px 0 0;
      }
    `}
`;

// Paste Area
export const PasteArea = styled.textarea`
  width: 100%;
  min-height: 220px;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.explanationBg};
  color: ${({ theme }) => theme.colors.text};
  margin: 1.5rem 0;
  font-family: 'Fira Code', monospace;
  resize: vertical;
  font-size: 0.95rem;
  line-height: 1.6;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.6;
  }
`;

// Manual Creator Components
export const FormContainer = styled.div`
  margin-top: 1.5rem;
  animation: ${fadeIn} 0.4s ease-out;
`;

export const FormGroup = styled.div`
  margin-bottom: 2rem;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      ${({ theme }) => theme.colors.border},
      transparent
    );
  }

  &:last-child:after {
    display: none;
  }
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:after {
    content: ${({ $required }: any) => ($required ? "'*'" : "''")};
    color: #ff4d4f;
  }
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.explanationBg};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.6;
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.explanationBg};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.6;
  }
`;

export const OptionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
`;

export const OptionInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.explanationBg};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`;

export const OptionCheckbox = styled.input`
  width: 1.5rem;
  height: 1.5rem;
  accent-color: #6366f1;
  cursor: pointer;
  transition: all 0.2s ease;

  &:checked {
    transform: scale(1.1);
  }
`;

export const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: #6366f1;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  cursor: pointer;
  font-weight: 600;
  margin-top: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(99, 102, 241, 0.2);

  &:hover {
    background: #4f46e5;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(99, 102, 241, 0.3);
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export const RemoveButton = styled.button`
  background: #ff4d4f;
  color: white;
  border: none;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    background: #ff7875;
    transform: scale(1.1);
  }
`;

export const QuestionCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: 1rem;
  padding: 1.75rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, #6366f1, #8b5cf6);
  }
`;

export const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h4 {
    margin: 0;
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const QuestionsContainer = styled.div`
  margin-top: 2.5rem;
`;
