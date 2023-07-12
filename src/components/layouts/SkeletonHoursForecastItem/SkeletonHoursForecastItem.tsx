/* eslint-disable react/no-array-index-key */
import React, { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './SkeletonHoursForecastItem.module.scss';

interface SkeletonHoursForecastItemProps {
  count: number;
}

const SkeletonHoursForecastItem: FC<SkeletonHoursForecastItemProps> = ({ count = 1 }) => (
  <>
    {Array(count).fill(0).map((_, index) => (
      <div
        key={index}
        className={styles.SkeletonHoursForecastItem}
      >
        <Skeleton className={styles.time} />
        <Skeleton className={styles.image} />
        <Skeleton className={styles.temp} />
      </div>
    ))}
  </>
);

export default SkeletonHoursForecastItem;
