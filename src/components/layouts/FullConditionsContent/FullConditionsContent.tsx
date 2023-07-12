import React, { FC, useMemo } from 'react';
import { ReactComponent as TempIcon } from '@assets/temp-icon.svg';
import { ReactComponent as WindIcon } from '@assets/wind-icon.svg';
import { ReactComponent as RainIcon } from '@assets/rain-icon.svg';
import { ReactComponent as SunIcon } from '@assets/sun-icon.svg';
import ConditionCard from '@layouts/ConditionCard/ConditionCard';
import styles from './SmallConditionsContent.module.scss';

type WithText<V> = {
  text: string,
  value: V,
};

interface SmallConditionsContentProps {
  feelsLike: WithText<string>,
  wind: WithText<string>,
  chanceOfRain: WithText<string>,
  uv: WithText<number>,
}

const FullConditionsContent: FC<SmallConditionsContentProps> = ({
  feelsLike, wind, chanceOfRain, uv,
}) => {
  const data = useMemo(() => ([
    { Icon: TempIcon, value: feelsLike.value, text: feelsLike.text },
    { Icon: WindIcon, value: wind.value, text: wind.text },
    { Icon: RainIcon, value: chanceOfRain.value, text: chanceOfRain.text },
    { Icon: SunIcon, value: uv.value, text: uv.text },
  ]), [feelsLike, wind, chanceOfRain.value, uv]);
  return (
    <div className={styles.SmallConditionsContent}>
      {data.map(({ Icon, value, text }) => (
        <ConditionCard
          key={text}
          text={text}
          value={value}
          Icon={Icon}
        />
      ))}
    </div>
  );
};

export default FullConditionsContent;
