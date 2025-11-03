// CanvasVisibilityDemo.tsx
import React, { useEffect, useRef } from 'react';

const NUM_ITEMS = 50;
const ITEM_SIZE = 60;
const DOT_MAX_SIZE = 30;

class Item {
  x: number;
  y: number;
  dx: number;
  dy: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width - ITEM_SIZE;
    this.y = Math.random() * height - ITEM_SIZE;
    this.dx = (Math.random() - 0.5) * 1.5;
    this.dy = (Math.random() - 0.5) * 1.5;
  }

  update(width: number, height: number) {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x < -ITEM_SIZE || this.x > width) this.dx *= -1;
    if (this.y < -ITEM_SIZE || this.y > height) this.dy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D, viewport: DOMRect) {
    // Draw parent (square)
    ctx.fillStyle = 'transparent';
    ctx.fillRect(this.x, this.y, ITEM_SIZE, ITEM_SIZE);

    // Compute intersection with viewport
    const itemRect = new DOMRect(this.x, this.y, ITEM_SIZE, ITEM_SIZE);
    const intersection = intersectRects(itemRect, viewport);

    const ratio =
      intersection && intersection.width > 0 && intersection.height > 0
        ? (intersection.width * intersection.height) / (ITEM_SIZE * ITEM_SIZE)
        : 0;

    // Draw child dot
    const dotSize = DOT_MAX_SIZE * ratio;
    ctx.beginPath();
    ctx.fillStyle = '#4FC3F7';
    ctx.arc(
      this.x + ITEM_SIZE / 2,
      this.y + ITEM_SIZE / 2,
      dotSize,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}

function intersectRects(a: DOMRect, b: DOMRect) {
  const x = Math.max(a.x, b.x);
  const y = Math.max(a.y, b.y);
  const width = Math.min(a.x + a.width, b.x + b.width) - x;
  const height = Math.min(a.y + a.height, b.y + b.height) - y;
  return width > 0 && height > 0 ? new DOMRect(x, y, width, height) : null;
}

const CanvasVisibilityDemo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const items = Array.from({ length: NUM_ITEMS }).map(
      () => new Item(canvas.width, canvas.height)
    );

    const viewport = canvas.getBoundingClientRect();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      items.forEach((item) => {
        item.update(canvas.width, canvas.height);
        item.draw(ctx, viewport);
      });

      requestAnimationFrame(render);
    };
    render();

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100vw', height: '100vh', background: '#111' }}
    />
  );
};

export default CanvasVisibilityDemo;
