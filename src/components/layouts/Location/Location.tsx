import React, { FC } from 'react';
import { Condition } from '@store/weatherSlice';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styles from './Location.module.scss';

interface LocationProps {
  name?: string,
  country?: string,
  condition?: Condition,
  temperature?: string
}

const Location: FC<LocationProps> = ({
  name = null, country = null, condition = null, temperature = null,
}) => (
  <div className={styles.Location}>
    <div className={styles.info}>
      <div className={styles.location_name}>
        <h2>{name || <Skeleton className={styles.location_name_name_skeleton} />}</h2>
        <span>{country || <Skeleton className={styles.location_name_country_skeleton} />}</span>
      </div>
      <div>
        <span className={styles.location_temperature}>
          {temperature || <Skeleton className={styles.location_temperature_skeleton} />}
        </span>
      </div>
    </div>
    {condition ? (
      <img className={styles.forecast_image} src={condition?.icon} alt={condition?.text} />
    ) : (
      <Skeleton className={styles.forecast_image_skeleton} />
    )}
  </div>
);

export default Location;
