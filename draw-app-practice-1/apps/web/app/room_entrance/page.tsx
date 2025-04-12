'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const RoomEntrance = () => {
  const router = useRouter();
  const [name, setName] = useState<string>('');

  const handleSubmit = () => {
    if (name) {
      router.push(`/room/${name}`);
    }
  };

  return (
    <>
      <input
        name='room'
        id='room'
        placeholder='Enter room name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={!name}>
        Go
      </button>
    </>
  );
};

export default RoomEntrance;
