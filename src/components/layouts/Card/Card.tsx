import React, {
  FC, useEffect, useState, useRef, useCallback, useMemo,
} from 'react';
import getScrollData from '@hooks/useScrollData';
import useDragScroll from '@hooks/useDragScroll';
import Button from '@ui/Button/Button';
import styles from './Card.module.scss';

interface CardProps {
  isBackgroundCard?: boolean,
  children: React.ReactNode,
}

const Card: FC<CardProps> = ({ isBackgroundCard = false, children }) => (
  <div className={`${styles.Card} ${isBackgroundCard && styles.bg_foreground}`}>
    {children}
  </div>
);

export default Card;
