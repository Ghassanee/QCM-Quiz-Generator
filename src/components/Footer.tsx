import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: white;
  padding: 1rem 1rem;
  margin-top: 3rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  color: #94a3b8;
  margin-top: 1rem;
`;

const TeamCredit = styled.p`
  font-size: 0.9rem;
  color: #cbd5e1;
  margin-top: 0.5rem;

  a {
    color: #818cf8;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Logo>Quizmo</Logo>

        <TeamCredit>
          Created with ❤️ by the{' '}
          <a href="https://hidanz.dev" target="_blank" rel="noopener noreferrer">
            @HidanzDev
          </a>{' '}
          team
        </TeamCredit>

        <Copyright>© {new Date().getFullYear()} Quizmo. All rights reserved.</Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
