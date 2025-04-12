'use client';
import { useEffect, useState } from 'react';
import useSocket from '../hooks/useSocket';
import { CHAT, JOIN_ROOM, LEAVE_ROOM } from '@repo/common/types';

const ChatRoom = ({
  roomId,
  messages,
}: {
  roomId: string;
  messages: { message: string }[];
}) => {
  const [chat, setChat] = useState(messages);
  const [currentMessage, setCurrentMessage] = useState('');
  const { socket, loading } = useSocket();

  useEffect(() => {
    if (socket && !loading) {
      socket.send(JSON.stringify({ type: JOIN_ROOM, roomId: roomId }));

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === CHAT) {
          setChat((prev) => [...prev, { message: data.message }]);
        }
      };

      socket.onclose = () => {
        socket.send(JSON.stringify({ type: LEAVE_ROOM, roomId: roomId }));
      };
    }
  }, [loading, socket, roomId]);

  return (
    <div>
      {chat.map((m, index) => (
        <div key={index}>{m.message}</div>
      ))}

      <input
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
        type='text'
        placeholder='Type your message'
      />
      <button
        onClick={() => {
          socket?.send(
            JSON.stringify({
              type: CHAT,
              roomId: roomId,
              message: currentMessage,
            })
          );
          setCurrentMessage('');
        }}
      >
        Send Message
      </button>
    </div>
  );
};

export default ChatRoom;
