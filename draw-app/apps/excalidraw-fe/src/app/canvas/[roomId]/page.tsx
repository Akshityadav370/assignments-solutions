'use client';

import { initDraw } from '@/draw';
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
      initDraw(canvasRef.current);
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
