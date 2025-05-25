'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import useTheme, { UseThemeResult } from '../hooks/useTheme';

const ThemeContext = createContext<UseThemeResult | undefined>(undefined);

export function useThemeContext(): UseThemeResult {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const themeValue = useTheme();
  
  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
} 