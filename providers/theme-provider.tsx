'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import '@ant-design/v5-patch-for-react-19';

type Theme = 'light' | 'dark' | 'system';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>('system');

  // Set theme from localStorage on client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (
        storedTheme === 'light' ||
        storedTheme === 'dark' ||
        storedTheme === 'system'
      ) {
        setTheme(storedTheme);
      }
    }
  }, []);

  // Match system and apply classes
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const element = document.documentElement;
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const onWindowMatch = () => {
      if (
        localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && darkQuery.matches)
      ) {
        element.classList.add('dark');
      } else {
        element.classList.remove('dark');
      }
    };

    // Initial run
    onWindowMatch();

    // Listen to system theme changes
    const changeHandler = (e: MediaQueryListEvent) => {
      if (!('theme' in localStorage)) {
        if (e.matches) {
          element.classList.add('dark');
        } else {
          element.classList.remove('dark');
        }
      }
    };

    darkQuery.addEventListener('change', changeHandler);

    return () => {
      darkQuery.removeEventListener('change', changeHandler);
    };
  }, []);

  // React to theme changes
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const element = document.documentElement;

    switch (theme) {
      case 'dark':
        element.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        break;
      case 'light':
        element.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        break;
      default:
        localStorage.removeItem('theme');
        const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
        if (darkQuery.matches) {
          element.classList.add('dark');
        } else {
          element.classList.remove('dark');
        }
        break;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
