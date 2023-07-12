import React, { useEffect } from 'react';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resources from './locales';

interface ProviderProps {
  children: React.ReactElement
}

const LocalizationProvider: React.FC<ProviderProps> = ({ children }) => {
  i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      fallbackLng: 'en',
      resources,
    });
  useEffect(() => {
    document.querySelector('html')?.setAttribute('lang', i18n.language);
    i18n.on('languageChanged', (lng) => { document.documentElement.setAttribute('lang', lng); });
  }, []);
  return (
    <I18nextProvider i18n={i18n}>
      {children && children }
    </I18nextProvider>
  );
};
export default LocalizationProvider;
