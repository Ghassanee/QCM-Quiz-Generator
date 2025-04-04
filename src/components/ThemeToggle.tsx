import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const ToggleButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const ThemeToggle = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <ToggleButton onClick={toggleTheme}>
      {mode === 'light' ? (
        <>
          <span>🌙</span> Dark Mode
        </>
      ) : (
        <>
          <span>☀️</span> Light Mode
        </>
      )}
    </ToggleButton>
  );
};

export default ThemeToggle;
