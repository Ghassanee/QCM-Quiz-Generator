'use client';

import { darkTheme, lightTheme, ThemeMode } from '@/styles/themes';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { DefaultTheme } from 'styled-components';

interface ThemeContextType extends DefaultTheme {
  theme: DefaultTheme;
  toggleTheme: () => void;
  mode: ThemeMode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('dark'); // Default value
  const [theme, setTheme] = useState<DefaultTheme>(darkTheme); // Default to dark

  // Load theme from localStorage after component mounts (client-side)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeMode | null;
    if (savedTheme) {
      setMode(savedTheme);
      setTheme(savedTheme === 'light' ? lightTheme : darkTheme);
    }
  }, []);

  const toggleTheme = () => {
    setMode((prev) => {
      const newMode = prev === 'light' ? 'dark' : 'light';
      setTheme(newMode === 'light' ? lightTheme : darkTheme);
      localStorage.setItem('theme', newMode);
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mode }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
