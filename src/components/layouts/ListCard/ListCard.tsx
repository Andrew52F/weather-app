import React, {
  FC, useEffect, useState, useRef, useCallback, useMemo,
} from 'react';
import getScrollData from '@hooks/useScrollData';
import useDragScroll from '@hooks/useDragScroll';
import Button from '@ui/Button/Button';
import Card from '@layouts/Card/Card';
import styles from './ListCard.module.scss';

interface ListCardProps {
  header?: string,
  isBackgroundCard?: boolean,
  isDirectionColumn?: boolean,
  isDraggable?: boolean,
  noScrollPadding?: boolean,
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement>,
  buttonText?: string,
  children: React.ReactNode,
}

const ListCard: FC<ListCardProps> = ({
  header = null, isBackgroundCard = false, isDirectionColumn = false, isDraggable = false, onButtonClick = null, noScrollPadding = false, buttonText = '', children,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scroll, maxScroll } = getScrollData(cardRef, isDirectionColumn);

  useDragScroll(isDraggable ? cardRef : undefined);

  const isStartShadow = scroll !== 0;
  const isEndShadow = scroll < maxScroll;
  return (
    <Card
      isBackgroundCard={isBackgroundCard}
    >
      <div className={`${styles.ListCard} ${isBackgroundCard && styles.bg_foreground}`}>
        {(header || onButtonClick) && (
          <div className={styles.header}>
            {header && (<h3>{header.toLocaleUpperCase()}</h3>)}
            {onButtonClick && (
            <Button
              onClick={onButtonClick}
              options={{
                font: 'small',
                padding: 'small',
              }}
            >
              {buttonText}
            </Button>
            )}
          </div>
        )}
        <div className={`${styles.shadows} ${isDraggable && styles.cursor_grab}`}>
          <div
            ref={cardRef}
            style={{
              transition: 'box-shadow 0.3s',
              overflow: 'auto',
            }}
            className={
          `${styles.content} ${isStartShadow && styles.start_shadow} ${isEndShadow && styles.end_shadow} ${isDirectionColumn ? styles.direction_column : styles.direction_row} ${(maxScroll === 0) && styles.p_0}`
        }
          >
            {children}
          </div>
        </div>
      </div>

    </Card>
  );
};

export default ListCard;
