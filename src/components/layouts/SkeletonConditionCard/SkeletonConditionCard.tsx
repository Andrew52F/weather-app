/* eslint-disable react/no-array-index-key */
import React, { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './SkeletonConditionCard.module.scss';

interface SkeletonConditionCardProps {
  count?: number,
}

const SkeletonConditionCard: FC<SkeletonConditionCardProps> = ({ count = 1 }) => (
  <>
    {Array(count).fill(0).map((_, index) => (
      <div
        key={index}
        className={styles.SkeletonConditionCard}
      >
        <div>
          <Skeleton className={styles.icon} />
        </div>
        <div>
          <Skeleton className={styles.text} />
          <Skeleton className={styles.value} />
        </div>
      </div>
    ))}
  </>
);

export default SkeletonConditionCard;
