import { useEffect, useRef, useState } from 'react';

function App() {
  const [messages, setMessages] = useState(['hi there', 'hello']);
  const wsRef = useRef<WebSocket>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    if (!inputRef || !wsRef) return;
    const message = inputRef?.current?.value;
    wsRef?.current?.send(
      JSON.stringify({
        type: 'chat',
        payload: { message: message },
      })
    );
  };

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: 'join',
          payload: { roomId: 'red' },
        })
      );
    };

    ws.onmessage = (event) => {
      setMessages((m) => [...m, event.data]);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className='h-screen bg-black flex flex-col'>
      <div className='flex flex-1 flex-col p-4'>
        {messages &&
          messages?.map((msg) => (
            <span className='p-2 bg-white text-black self-start rounded m-2'>
              {msg}
            </span>
          ))}
      </div>
      <div className='w-full bg-white flex p-4'>
        <input
          ref={inputRef}
          type='text'
          name=''
          id=''
          className='flex-1'
          placeholder='Type your message...'
        />
        <button
          onClick={sendMessage}
          className='bg-purple-600 text-white p-2 rounded'
        >
          Send Message
        </button>
      </div>
    </div>
  );
}

export default App;
