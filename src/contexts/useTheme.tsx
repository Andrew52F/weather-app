import React, {
  createContext, useState, useEffect, useContext, useMemo,
} from 'react';

export interface ProviderProps {
  children: React.ReactElement;
}

export type ActualTheme = 'light' | 'dark';

export interface ThemeContextProps {
  theme: ActualTheme;
  themes: ActualTheme[];
  setTheme: (theme: ActualTheme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  themes: ['light', 'dark'],
  setTheme: () => {},
});

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  useEffect(() => {
    document.body.classList.value = '';
    document.body.classList.add(`theme_${context.theme}`);
  }, [context.theme]);

  return context;
};

const getLocalTheme = (themes: ActualTheme[]): ActualTheme | null => {
  const savedTheme = localStorage.getItem('theme') as ActualTheme;
  if (themes.includes(savedTheme)) {
    return savedTheme;
  }
  return null;
};
const getSystemTheme = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// eslint-disable-next-line react/require-default-props
export const ThemeProvider: React.FC<ProviderProps> = ({ children }) => {
  const themes: ActualTheme[] = ['light', 'dark'];
  const [theme, setTheme] = useState<ActualTheme>(getLocalTheme(themes) || getSystemTheme());

  const setLocalTheme = (localTheme: ActualTheme) => {
    localStorage.setItem('theme', localTheme);
    setTheme(localTheme);
  };

  const contextValue = useMemo(() => ({
    theme,
    themes,
    setTheme: setLocalTheme,
  }), [theme, themes]);

  return (
    <ThemeContext.Provider value={contextValue}>
      { children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
