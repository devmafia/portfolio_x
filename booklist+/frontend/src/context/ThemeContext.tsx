import React, { createContext, useContext, useState, ReactNode } from 'react';

// Інтерфейс для теми
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// Створення контексту
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Провайдер контексту
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Хук для використання контексту
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
