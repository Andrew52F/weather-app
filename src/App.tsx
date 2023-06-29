import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/Home/Home';
import LocalizationProvider from './localization';
import { ThemeProvider } from './contexts/useTheme';

const App = () => (
  <ThemeProvider>
    <LocalizationProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/weather/:location' element='Weather' />
          <Route path='/search' element='Search' />
          <Route path='/map' element='Map' />
          <Route path='/settings' element='Settings' />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  </ThemeProvider>
);
export default App;
