/* eslint-disable react/no-array-index-key */
import React, { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './SkeletonDayForecastItem.module.scss';

interface SkeletonDayForecastItemProps {
  count?: number,
}

const SkeletonDayForecastItem: FC<SkeletonDayForecastItemProps> = ({ count = 1 }) => (
  <>
    {Array(count).fill(0).map((_, index) => (
      <div
        key={index}
        className={styles.SkeletonDayForecastItem}
      >
        <div className={styles.text}>
          <Skeleton className={styles.day} />
          <Skeleton className={styles.temp} />
        </div>
        <div className={styles.condition}>
          <Skeleton className={styles.condition_text} />
          <Skeleton className={styles.condition_image} />
        </div>
      </div>
    ))}
  </>
);

export default SkeletonDayForecastItem;
