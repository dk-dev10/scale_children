// components/ItemWithDotIO.tsx
import React, { useEffect, useRef } from 'react';

interface ItemWithDotProps {
  id: number;
}

export const ItemWithDotIO: React.FC<ItemWithDotProps> = ({ id }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;
          if (dotRef.current) {
            dotRef.current.style.transform = `scale(${ratio})`;
          }
        });
      },
      {
        threshold: Array.from({ length: 11 }, (_, i) => i / 10), // 0, 0.1, ... 1
      }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  return (
    <div className='item' ref={itemRef}>
      Item {id}
      <div className='dot' ref={dotRef} />
    </div>
  );
};
