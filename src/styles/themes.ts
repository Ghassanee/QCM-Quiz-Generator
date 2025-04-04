import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  colors: {
    primary: '#6366f1', // Indigo 500
    secondary: '#4f46e5', // Indigo 600
    background: '#f8fafc', // Slate 50
    surface: '#ffffff', // White cards, modals
    text: '#0f172a', // Slate 900
    border: '#e2e8f0', // Slate 200
    success: '#10b981', // Emerald 500
    error: '#ef4444', // Red 500
    muted: '#64748b', // Slate 500 for secondary text
    explanationBg: '#f1f5f9', // Slightly different from background for sections
  },
};

export const darkTheme: DefaultTheme = {
  colors: {
    primary: '#818cf8', // Indigo 400
    secondary: '#6366f1', // Indigo 500
    background: '#0f172a', // Slate 900
    surface: '#1e293b', // Slate 800
    text: '#f8fafc', // Slate 50
    border: '#334155', // Slate 700
    success: '#10b981', // Emerald 500
    error: '#ef4444', // Red 500
    muted: '#94a3b8', // Slate 400
    explanationBg: '#1e293b', // Matches surface for consistency
  },
};

export type ThemeMode = 'light' | 'dark';
