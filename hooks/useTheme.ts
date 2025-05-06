import { useState, useEffect } from 'react';

type Theme = 'dark' | 'light' | 'system';

// CSS variables configuration for themes
const themeVariables = {
  dark: {
    '--bg-primary': '#121212',
    '--bg-secondary': '#1e1e1e',
    '--text-primary': '#ffffff',
    '--text-secondary': '#b3b3b3',
    '--accent-color': '#64b5f6',
    '--border-color': '#333333',
    '--input-bg': '#2c2c2c',
    '--card-bg': '#252525',
    '--success-color': '#4caf50',
    '--warning-color': '#ff9800',
    '--error-color': '#f44336',
  },
  light: {
    '--bg-primary': '#ffffff',
    '--bg-secondary': '#f5f5f5',
    '--text-primary': '#121212',
    '--text-secondary': '#6b6b6b',
    '--accent-color': '#1976d2',
    '--border-color': '#e0e0e0',
    '--input-bg': '#f9f9f9',
    '--card-bg': '#ffffff',
    '--success-color': '#4caf50',
    '--warning-color': '#ff9800',
    '--error-color': '#f44336',
  }
};

export interface UseThemeResult {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
}

const useTheme = (): UseThemeResult => {
  // Initialize from localStorage or default to system
  const [theme, setThemeState] = useState<Theme>('system');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply theme to document root
  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    // Determine actual theme (system means follow OS preference)
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const actualTheme = newTheme === 'system' ? (prefersDark ? 'dark' : 'light') : newTheme;
    
    // Apply CSS variables
    const variables = themeVariables[actualTheme];
    Object.entries(variables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    
    // Set data attribute for CSS selectors
    root.setAttribute('data-theme', actualTheme);
    
    // Update dark mode state
    setIsDarkMode(actualTheme === 'dark');
  };

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme && ['dark', 'light', 'system'].includes(savedTheme)) {
      setThemeState(savedTheme);
    }
  }, []);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Apply theme whenever it changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Update theme and save to localStorage
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return { theme, setTheme, isDarkMode };
};

export default useTheme; 