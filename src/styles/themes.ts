import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  colors: {
    // Primary brand color (buttons, main actions)
    primary: '#6366f1', // Indigo-600 (slightly more vibrant)
    // Secondary brand color (secondary buttons, accents)
    secondary: '#8b5cf6', // Purple-500 (complementary to indigo)

    // Background colors
    background: '#f9fafb', // Slightly off-white for better readability
    surface: '#ffffff', // Pure white for cards

    // Text colors
    text: '#111827', // Gray-900 (better contrast)
    textSecondary: '#4b5563', // Gray-600 for secondary text
    textInverted: '#f9fafb', // For text on primary buttons

    // UI elements
    border: '#e5e7eb', // Gray-200 (softer border)
    divider: '#e5e7eb', // For separating sections

    // Status colors
    success: '#10b981', // Emerald-500
    error: '#ef4444', // Red-500
    warning: '#f59e0b', // Amber-500
    info: '#3b82f6', // Blue-500

    // Special backgrounds
    explanationBg: '#f3f4f6', // Gray-100
    cardBg: '#ffffff',
    highlightOption: '#dbeafe', // Blue-100 for selected options

    // Interactive states
    primaryHover: '#4f46e5', // Indigo-700
    secondaryHover: '#7c3aed', // Purple-600

    // Other colors
    explanationText: '#6b7280', // Gray-500
    muted: '#9ca3af', // Gray-400
  },
  mode: 'light',
};

export const darkTheme: DefaultTheme = {
  colors: {
    // Primary brand color
    primary: '#818cf8', // Indigo-400
    // Secondary brand color
    secondary: '#a78bfa', // Purple-400

    // Background colors
    background: '#111827', // Gray-900
    surface: '#1f2937', // Gray-800

    // Text colors
    text: '#f9fafb', // Gray-50
    textSecondary: '#9ca3af', // Gray-400
    textInverted: '#111827', // For text on primary buttons

    // UI elements
    border: '#374151', // Gray-700
    divider: '#374151', // For separating sections

    // Status colors
    success: '#10b981', // Emerald-500
    error: '#ef4444', // Red-500
    warning: '#f59e0b', // Amber-500
    info: '#3b82f6', // Blue-500

    // Special backgrounds
    explanationBg: '#1f2937', // Matches surface
    cardBg: '#1f2937',
    highlightOption: '#1e40af', // Blue-900 for selected options

    // Interactive states
    primaryHover: '#6366f1', // Indigo-500
    secondaryHover: '#8b5cf6', // Purple-500
    explanationText: '#9ca3af',
    muted: '#6b7280',
  },
  mode: 'dark',
};

export type ThemeMode = 'light' | 'dark';
