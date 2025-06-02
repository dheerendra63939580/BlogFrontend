import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  effectiveMode: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('app-theme') as Theme;
    return savedTheme || 'system';
  });

  const [effectiveMode, setEffectiveMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const determineMode = () => {
      if (theme === 'dark') setEffectiveMode('dark');
      else if (theme === 'light') setEffectiveMode('light');
      else setEffectiveMode(mediaQuery.matches ? 'dark' : 'light');
    };

    determineMode();

    const handleSystemChange = () => {
      if (theme === 'system') determineMode();
    };

    mediaQuery.addEventListener('change', handleSystemChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemChange);
    };
  }, [theme]);

  useEffect(() => {
    const html = document.documentElement;
    if (effectiveMode === 'dark') html.classList.add('dark');
    else html.classList.remove('dark');
  }, [effectiveMode]);

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, effectiveMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
