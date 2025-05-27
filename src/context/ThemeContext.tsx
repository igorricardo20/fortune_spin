import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeSettings } from '../types';

interface ThemeContextType {
  theme: ThemeSettings;
  toggleTheme: () => void;
  setThemeColor: (color: string) => void;
}

const initialTheme: ThemeSettings = {
  mode: 'dark',
  primaryColor: '#7C3AED', // Purple
  accentColor: '#F59E0B' // Amber
};

const ThemeContext = createContext<ThemeContextType>({
  theme: initialTheme,
  toggleTheme: () => {},
  setThemeColor: () => {}
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeSettings>(initialTheme);

  useEffect(() => {
    // Check if theme is stored in localStorage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(JSON.parse(storedTheme));
    }
    
    // Apply the theme to the document
    applyTheme(storedTheme ? JSON.parse(storedTheme) : initialTheme);
  }, []);

  const applyTheme = (themeSettings: ThemeSettings) => {
    const root = document.documentElement;
    
    // Apply dark/light mode
    if (themeSettings.mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Set CSS variables for colors
    root.style.setProperty('--primary-color', themeSettings.primaryColor);
    root.style.setProperty('--accent-color', themeSettings.accentColor);
  };

  const toggleTheme = () => {
    const newTheme = {
      ...theme,
      mode: theme.mode === 'dark' ? 'light' : 'dark'
    };
    
    setTheme(newTheme);
    localStorage.setItem('theme', JSON.stringify(newTheme));
    applyTheme(newTheme);
  };

  const setThemeColor = (color: string) => {
    const newTheme = {
      ...theme,
      primaryColor: color
    };
    
    setTheme(newTheme);
    localStorage.setItem('theme', JSON.stringify(newTheme));
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setThemeColor
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};