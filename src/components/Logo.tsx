// components/Logo.tsx
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LogoText = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const Logo = () => (
  <LogoContainer>
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
        fill="url(#paint0_linear)"
      />
      <path d="M12 22L20 10" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 22L22 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
    </svg>
    <LogoText>Quizmo</LogoText>
  </LogoContainer>
);
