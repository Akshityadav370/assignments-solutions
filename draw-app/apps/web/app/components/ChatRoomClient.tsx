import { useEffect, useState } from 'react';
import useSocket from '../hooks/useSocket';
import { JOIN_ROOM, CHAT, LEAVE_ROOM } from '@repo/common/types';

const ChatRoomClient = ({
  messages,
  id,
}: {
  messages: { message: string }[];
  id: string;
}) => {
  const [chat, setChat] = useState(messages);
  const [currentMessage, setCurrentMessage] = useState('');
  const { socket, loading } = useSocket();

  useEffect(() => {
    if (socket && !loading) {
      socket.send(JSON.stringify({ type: JOIN_ROOM, roomId: id }));

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === CHAT) {
          setChat((prev) => [...prev, { message: data.message }]);
        }
      };

      socket.onclose = () => {
        socket.send(JSON.stringify({ type: LEAVE_ROOM, roomId: id }));
      };
    }
  }, [loading, socket, id]);

  return (
    <div>
      {messages.map((m) => (
        <div>{m.message}</div>
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
            JSON.stringify({ type: CHAT, roomId: id, message: currentMessage })
          );
          setCurrentMessage('');
        }}
      >
        Send Message
      </button>
    </div>
  );
};

export default ChatRoomClient;
