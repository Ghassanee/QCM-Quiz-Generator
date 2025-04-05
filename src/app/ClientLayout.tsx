'use client';
import styled from 'styled-components';
import { GlobalStyles } from '@/lib/styled-components';
import ThemeToggle from '@/components/ThemeToggle';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useTheme } from '@/context/ThemeContext';
import { Logo } from '@/components/Logo';
import { useRouter } from 'next/navigation';

const AppHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: ${({ theme }) => theme.colors.cardBg + '50'};
`;

const AppContent = styled.main`
  padding: 4rem 0rem;
`;

const LogoContainer = styled.div`
  cursor: pointer;
`;

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      <AppHeader>
        <LogoContainer
          onClick={() => {
            router.push('/');
          }}
        >
          <Logo />
        </LogoContainer>
        <ThemeToggle />
      </AppHeader>
      <AppContent>{children}</AppContent>
    </StyledThemeProvider>
  );
}
