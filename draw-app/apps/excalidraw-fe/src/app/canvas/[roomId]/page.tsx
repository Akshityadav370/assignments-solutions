'use client';

import Canvas from '@/components/Canvas';
import useSocket from '@/hooks/useSocket';
import { use } from 'react';

const CanvasRoom = ({ params }: { params: Promise<{ roomId: string }> }) => {
  const { roomId } = use(params);

  const { socket, loading } = useSocket();

  if (!socket || loading || !roomId) {
    return <div>Connecting to server...</div>;
  }

  return <Canvas roomId={roomId} socket={socket} />;
};

export default CanvasRoom;
