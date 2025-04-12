import Link from 'next/link';

export default function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-slate-900'>
      <div className='flex flex-col items-center gap-4'>
        <h1 className='text-2xl font-bold text-white'>Excalidraw</h1>
        <h2 className='text-lg text-gray-500'>
          A collaborative whiteboard tool
        </h2>
      </div>
      <Link href='/signin'>
        <button className='bg-blue-500 text-white p-2 rounded'>Sign in</button>
      </Link>
      <Link href='/signup'>
        <button className='bg-blue-500 text-white p-2 rounded'>Sign up</button>
      </Link>
    </div>
  );
}
