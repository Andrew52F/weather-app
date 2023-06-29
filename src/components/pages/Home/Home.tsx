import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import umbrellaImage from '@assets/umbrella.png';
import Button from '../../ui/Button/Button';
import { useThemeContext } from '../../../contexts/useTheme';
import styles from './Home.module.scss';

const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useThemeContext();
  const navigate = useNavigate();

  return (
    <div className={`${styles.main}`}>
      <div className={styles.section} id={styles.card}>
        <img src={umbrellaImage} id={styles.umbrella} alt='umbrella' />
      </div>
      <div className={`${styles.textSelection} ${styles.section}`}>
        <img src={umbrellaImage} id={styles.small_umbrella} alt='umbrella' />
        <div className={styles.heading}>
          <h1>Breeze</h1>
          <span>{t('weather-app')}</span>
        </div>
        <Button
          onClick={() => navigate('/weather')}
        >
          {t('get-started')}
        </Button>
        <Button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          Change theme
        </Button>
        <Button
          onClick={() => i18n.changeLanguage(i18n.resolvedLanguage === 'en' ? 'ru' : 'en')}
        >
          Change language
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
