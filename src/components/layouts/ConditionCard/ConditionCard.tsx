import React, { FC } from 'react';
import styles from './ConditionCard.module.scss';

interface ConditionCardProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string,
  value: string | number | string[],
}

const ConditionCard: FC<ConditionCardProps> = ({
  Icon, text, value,
}) => (
  <div className={styles.ConditionCard}>
    <div>
      <Icon className={styles.icon} />
    </div>
    <div>
      <h4>{text}</h4>
      {Array.isArray(value)
        ? value.map((string) => (
          <div key={string}>
            <span>{string}</span>
            <br />
          </div>
        ))
        : (
          <span>{value}</span>
        )}
    </div>
  </div>
);

export default ConditionCard;
