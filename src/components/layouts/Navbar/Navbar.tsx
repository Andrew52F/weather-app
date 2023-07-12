import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import umbrellaImage from '@assets/umbrella.png';
import { useTranslation } from 'react-i18next';

import { ReactComponent as WeatherIcon } from '@assets/weather-icon.svg';
import { ReactComponent as ListIcon } from '@assets/list-icon.svg';
import { ReactComponent as MapIcon } from '@assets/map-icon.svg';
import { ReactComponent as SettingsIcon } from '@assets/settings-icon.svg';
import styles from './Navbar.module.scss';

interface NavbarProps {}

type NavOption = {
  to: string,
  text: string,
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const Navbar: FC<NavbarProps> = () => {
  const { t } = useTranslation();
  const navOptions: NavOption[] = [
    { to: '/weather', text: t('navbar.weather'), Icon: WeatherIcon },
    { to: '/search', text: t('navbar.search'), Icon: ListIcon },
    { to: '/map', text: t('navbar.map'), Icon: MapIcon },
    { to: '/settings', text: t('navbar.settings'), Icon: SettingsIcon },
  ];

  return (
    <aside className={styles.Navbar}>
      <img src={umbrellaImage} alt='umbrella' id={styles.image} />
      <nav>
        <ul className={styles.nav_list}>
          {navOptions.map(({ to, text, Icon }) => (
            <li key={to} className={styles.nav_item}>
              <NavLink
                to={to}
              >
                <Icon />
                <span>{text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Navbar;
