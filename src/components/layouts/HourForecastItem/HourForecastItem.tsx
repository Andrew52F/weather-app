import React, { FC } from 'react';
import { Condition } from '@store/weatherSlice';
import Skeleton from 'react-loading-skeleton';
import styles from './HourForecastItem.module.scss';

interface HourForecastItemProps {
  temperature: string,
  time: string,
  condition: Condition
}

const HourForecastItem: FC<HourForecastItemProps> = (
  { temperature = null, time = null, condition = null },
) => (
  <div className={styles.HourForecastItem}>
    <span className={styles.time}>{time}</span>
    <img src={condition?.icon} className={styles.image} alt={condition?.text} />
    <span className={styles.temperature}>
      {temperature}
    </span>
  </div>
);

export default HourForecastItem;
