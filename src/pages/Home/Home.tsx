import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import umbrellaImage from '../../assets/umbrella.png';
import Button from '../../components/global/Button/Button';
import { useThemeContext } from '../../hooks/useTheme';
import './Home.scss';

const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useThemeContext();
  const navigate = useNavigate();

  return (
    <div className='main'>
      <div className='section' id='card'>
        <img src={umbrellaImage} id='umbrella' alt='umbrella' />
      </div>
      <div className='text-section section'>
        <img src={umbrellaImage} id='small-umbrella' alt='umbrella' />
        <div className='heading'>
          <h1>Breeze</h1>
          <span>{t('weather-app')}</span>
        </div>
        <Button
          onClick={() => navigate('/weather')}
        >
          {t('get-started')}
        </Button>
        {/* <Button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          Change theme
        </Button>
        <Button
          onClick={() => i18n.changeLanguage(i18n.resolvedLanguage === 'en' ? 'ru' : 'en')}
        >
          Change language
        </Button> */}
      </div>
    </div>
  );
};

export default HomePage;
