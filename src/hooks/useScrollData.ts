import { useState, useEffect } from 'react';

const scrollMax: (el: any, isTop: boolean) => number = (el, isTop) => (isTop ? (
  el.scrollHeight - el.clientHeight
) : (
  el.scrollWidth - el.clientWidth
));

type GetScrollType = (
  ref: React.RefObject<HTMLDivElement>,
  isDirectionColumn: boolean,
) => ReturnValue;

type ReturnValue = {
  scroll: number,
  maxScroll: number,
};

const useScrollData: GetScrollType = (ref, isDirectionColumn) => {
  const [scroll, setScroll] = useState([0, 0]);

  useEffect(() => {
    const handleScroll = (event: any) => {
      const newMaxScroll = scrollMax(event.target, isDirectionColumn);
      const newScroll = isDirectionColumn ? event.target.scrollTop : event.target.scrollLeft;
      setScroll([newScroll, newMaxScroll]);
    };

    ref.current?.addEventListener('scroll', handleScroll);
    return () => {
      ref.current?.removeEventListener('scroll', handleScroll);
    };
  }, [isDirectionColumn, ref.current]);

  useEffect(() => {
    // Функция, которая будет вызываться после фетча и обновления размера прокрутки
    const updateScrollData = () => {
      const newMaxScroll = scrollMax(ref.current, isDirectionColumn);
      // console.log('Change ', newMaxScroll);
      if (newMaxScroll) {
        setScroll([scroll[0], newMaxScroll]);
      }
    };
    updateScrollData();
  }, [ref.current?.childElementCount, ref.current]);
  // console.log('REF ', ref.current?.children.length);

  return {
    scroll: scroll[0],
    maxScroll: scroll[1],
  };
};

export default useScrollData;
