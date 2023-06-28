export interface ProviderProps {
  children: React.ReactElement;
}

export type ActualTheme = 'light' | 'dark';

export interface ThemeContextProps {
  theme: ActualTheme;
  themes: ActualTheme[];
  setTheme: (theme: ActualTheme) => void;
}
