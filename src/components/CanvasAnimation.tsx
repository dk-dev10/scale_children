// CanvasAnimation.tsx
import React, { useEffect, useRef } from 'react';

const NUM_DOTS = 300;

class Dot {
  x: number;
  y: number;
  size: number;
  dx: number;
  dy: number;
  color: string;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 5 + 2;
    this.dx = (Math.random() - 0.5) * 2;
    this.dy = (Math.random() - 0.5) * 2;
    this.color = `hsl(${Math.random() * 360}, 60%, 60%)`;
  }

  update(width: number, height: number) {
    this.x += this.dx;
    this.y += this.dy;

    // Bounce off edges
    if (this.x < 0 || this.x > width) this.dx *= -1;
    if (this.y < 0 || this.y > height) this.dy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const CanvasAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    // Resize canvas to fill parent
    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize dots
    const dots = Array.from(
      { length: NUM_DOTS },
      () => new Dot(canvas.width, canvas.height)
    );

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((dot) => {
        dot.update(canvas.width, canvas.height);
        dot.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100vw',
        height: '100vh',
        display: 'block',
        background: '#111',
      }}
    />
  );
};

export default CanvasAnimation;
