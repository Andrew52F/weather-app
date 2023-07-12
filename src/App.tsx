import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import Home from '@pages/Home/Home';
import Weather from '@pages/Weather/Weather';
import { setupStore } from '@store/index';
import LocalizationProvider from '@localization/index';
import PageLayout from '@layouts/PageLayout/PageLayout';
import { SkeletonTheme } from 'react-loading-skeleton';
import { ThemeProvider, useThemeContext } from './contexts/useTheme';

const store = setupStore();

interface SkeletonProViderProps {
  children: React.ReactNode;
}
const SkeletonProvider: FC<SkeletonProViderProps> = ({ children }) => {
  const { theme } = useThemeContext();
  const options = {
    light: {
      baseColor: '#9399a2',
      highlightColor: '#fff',
    },
    dark: {
      baseColor: '#202b3b',
      highlightColor: '#9399a2',
    },
  };
  return (
    <SkeletonTheme
      baseColor={options[theme].baseColor}
      highlightColor={options[theme].highlightColor}
    >
      {children}
    </SkeletonTheme>
  );
};

const App = () => (
  <ThemeProvider>
    <SkeletonProvider>
      <StoreProvider store={store}>
        <LocalizationProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route element={<PageLayout />}>
                <Route path='/weather' element={<Weather />} />
                <Route path='/search' element={<div>Search</div>} />
                <Route path='/map' element={<div>Map</div>} />
                <Route path='/settings' element={<div>Settings</div>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </LocalizationProvider>
      </StoreProvider>
    </SkeletonProvider>
  </ThemeProvider>
);
export default App;
