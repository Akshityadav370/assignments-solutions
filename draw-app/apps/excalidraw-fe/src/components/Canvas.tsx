'use client';

import { initDraw } from '@/draw';
import { JOIN_ROOM, LEAVE_ROOM } from '@repo/common/types';
import { useEffect, useRef, useState } from 'react';

const Canvas = ({ roomId, socket }: { roomId: string; socket: WebSocket }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    if (canvasRef.current && roomId && socket) {
      socket.send(JSON.stringify({ type: JOIN_ROOM, roomId: Number(roomId) }));
      initDraw(canvasRef.current, roomId, socket);
    }

    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({ type: LEAVE_ROOM, roomId: Number(roomId) })
        );
      }
    };
  }, [canvasRef, roomId, socket]);

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
