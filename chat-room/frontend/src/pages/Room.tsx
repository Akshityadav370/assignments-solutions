import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { roomColors } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

const Room = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const colorKey = searchParams.get('roomId');
  const gradientColor = roomColors[colorKey] || 'gray';
  const wsRef = useRef<WebSocket>(null);
  const [messageToSend, setMessageToSend] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<{ name: string; message: string }[]>(
    []
  );

  const sendMessage = () => {
    if (wsRef.current && messageToSend.trim()) {
      wsRef.current.send(
        JSON.stringify({
          type: 'message',
          payload: { name: name, message: messageToSend },
        })
      );
      setMessageToSend('');
    }
  };

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: 'join',
          payload: { name: name, room: colorKey },
        })
      );
      toast(`Connected to room ${colorKey}`);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'message') {
        setMessages((prevMessages) => [
          ...prevMessages,
          { name: data.name, message: data.message },
        ]);
      } else if (data.type === 'welcome') {
        toast.success(data.message, { position: 'top-center' });
      }
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div
      className='flex flex-col gap-10 h-screen w-screen items-center justify-center p-4'
      style={{
        background: `linear-gradient(to right, ${gradientColor}, #ffffff)`,
      }}
    >
      <div className='size-full overflow-hidden overflow-y-scroll'>
        <div className='pb-10 overflow-hidden'>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 p-2 ${
                msg.name === name ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`rounded-full w-8 h-8 flex items-center justify-center text-white font-bold `}
                style={{ backgroundColor: 'grey' }}
              >
                {msg.name[0].toUpperCase()}
              </div>
              <div
                className={`p-2 rounded-lg ${
                  msg.name === name ? 'border-2 border-gray-300' : 'bg-gray-300'
                } min-w-[100px]`}
              >
                <p className='text-sm font-semibold italic underline text-grey'>
                  {msg.name}
                </p>
                <p>{msg.message}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
      </div>
      <div className='flex w-[100%] gap-5 z-10'>
        <Input
          name='message'
          placeholder='Type a message...'
          className='bg-black text-white placeholder-gray-400'
          value={messageToSend}
          onChange={(e) => setMessageToSend(e.target.value)}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default Room;
