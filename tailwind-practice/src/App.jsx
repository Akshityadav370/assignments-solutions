import { useState } from 'react';
import { LuMonitorCog } from 'react-icons/lu';
function App() {
  const [birthYear, setBirthYear] = useState('');

  return (
    <main className='bg-blue-950 w-[100vw] h-[100vh] justify-items-center pt-20'>
      <header className='flex items-center gap-3'>
        <LuMonitorCog size={28} color='white' />
        <span className='flex items-baseline'>
          <p className='text-teal-400 text-2xl'>Webinar</p>
          <p className='text-white text-2xl'>.gg</p>
        </span>
      </header>
      <div className='flex flex-col justify-items-center text-center'>
        <h2 className='text-white text-3xl mt-15'>Verify Your Age</h2>
        <p className='text-base text-gray-400 mt-10'>
          Please confirm your birth year. This data will not be stored.
        </p>
        <input
          className='rounded-xl bg-gray-800 mt-10 w-[90%] self-center p-3 text-white border-1 border-gray-400'
          placeholder='Your Birth Year'
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
        />
        <button
          className={`mt-10 p-3 w-[90%] self-center rounded-xl text-white ${
            birthYear ? 'bg-teal-400' : 'bg-gray-400'
          }`}
        >
          Continue
        </button>
      </div>
    </main>
  );
}

export default App;
