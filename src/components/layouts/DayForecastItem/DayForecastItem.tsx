import React, { FC } from 'react';
import { Condition } from '@store/weatherSlice';
import styles from './DayForecastItem.module.scss';

interface DayForecastItemProps {
  tempMin?: number,
  tempMax?: number,
  tempSymbol?: string,
  weekDay?: string,
  condition?: Condition
}

const DayForecastItem: FC<DayForecastItemProps> = ({
  tempMax = null, tempMin = null, tempSymbol = null, weekDay = null, condition = null,
}) => (
  <div className={styles.DayForecastItem}>
    <div className={styles.text}>
      <span className={styles.day}>{weekDay}</span>
      <p className={styles.temps}>
        <span>{`${tempMax}${tempSymbol}`}</span>
        {`/${tempMin} ${tempSymbol}`}
      </p>
    </div>
    <div className={styles.condition}>
      <span>{condition?.text}</span>
      <img src={condition?.icon} alt={condition?.text} />
    </div>
  </div>
);

export default DayForecastItem;
