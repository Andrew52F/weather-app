import React, { FC } from 'react';
import { useThemeContext } from '@contexts/useTheme';
import { Outlet } from 'react-router-dom';
import Navbar from '@layouts/Navbar/Navbar';
import styles from './PageLayout.module.scss';

interface PageLayoutProps {}

const PageLayout: FC<PageLayoutProps> = () => {
  useThemeContext();
  return (
    <div className={styles.PageLayout}>
      <div className={styles.contents}>
        <Outlet />
        <Navbar />
      </div>
    </div>
  );
};

export default PageLayout;
