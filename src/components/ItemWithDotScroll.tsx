import React, { useEffect, useRef } from 'react';

interface ItemWithDotProps {
  id: number;
}

export const ItemWithDotScroll: React.FC<ItemWithDotProps> = () => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const item = itemRef.current;
      if (!item) return;

      const rect = item.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const itemCenterY = rect.top + rect.height / 2;
      const viewportCenterY = viewportHeight / 2;

      const visibleHeight =
        Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
      const ratio = Math.max(0, Math.min(1, visibleHeight / rect.height));

      const directionFactor = itemCenterY > viewportCenterY ? 1 : -1;

      const posY =
        ((visibleHeight - rect.height) / 2 / (ratio || 1)) * directionFactor;

      item.style.setProperty('--ratio', `${ratio}`);
      item.style.setProperty('--pos', `${posY}px`);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='item' ref={itemRef}>
      <div className='dot scroll' />
    </div>
  );
};
