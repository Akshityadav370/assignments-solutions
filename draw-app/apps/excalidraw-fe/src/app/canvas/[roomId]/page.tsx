'use client';

import { useEffect, useRef, useState } from 'react';

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set dimensions on mount
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let clicked = false;
      let startX = 0;
      let startY = 0;

      const handleMouseDown = (e: MouseEvent) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
      };

      const handleMouseUp = (e: MouseEvent) => {
        clicked = false;
        console.log(e.clientX, e.clientY);
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (clicked) {
          const width = e.clientX - startX;
          const height = e.clientY - startY;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
          ctx.strokeRect(startX, startY, width, height);
        }
      };

      canvas.addEventListener('mousedown', handleMouseDown);
      canvas.addEventListener('mouseup', handleMouseUp);
      canvas.addEventListener('mousemove', handleMouseMove);

      return () => {
        canvas.removeEventListener('mousedown', handleMouseDown);
        canvas.removeEventListener('mouseup', handleMouseUp);
        canvas.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className='bg-white w-screen h-screen'
    />
  );
};

export default Canvas;
