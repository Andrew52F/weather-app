/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';

const useDragScroll = (ref?: React.RefObject<HTMLDivElement>) => {
  if (!ref) {
    return;
  }
  const [dragScroll, setDragScroll] = useState({
    top: 0, left: 0, x: 0, y: 0, isDown: false,
  });
  // useEffect(() => {
  //   console.log('DragScroll ', dragScroll);
  // }, [dragScroll]);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      if (dragScroll.isDown && ref.current) {
        const dx = e.clientX - dragScroll.x;
        const dy = e.clientY - dragScroll.y;
        const target = ref.current;

        target.scrollTop = dragScroll.top - dy;
        target.scrollLeft = dragScroll.left - dx;
      }
    };
    const handleMouseDown = (e: any) => {
      e.preventDefault();
      // console.log('DOWN!');
      e.currentTarget.style.setProperty('user-select', 'none');
      if (ref.current && ref.current.style) {
        ref.current.style.cursor = 'grabbing';
        ref.current.style.userSelect = 'grab';
      }
      setDragScroll(() => ({
        left: (ref?.current) ? ref?.current?.scrollLeft : 0,
        top: (ref?.current) ? ref?.current?.scrollTop : 0,
        x: e.clientX,
        y: e.clientY,
        isDown: true,
      }));
    };
    const handleMouseUp = (e: any) => {
      e.preventDefault();
      if (!ref) { return; }
      // console.log('UP!');
      if (ref.current && e.target.style) {
        ref.current.style.cursor = 'grab';
      }

      setDragScroll((state) => ({ ...state, isDown: false }));

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    if (ref.current) {
      ref.current.addEventListener('mousedown', handleMouseDown as any);
    }
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('mousedown', handleMouseDown as any);
      }
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [dragScroll]);
};

export default useDragScroll;
