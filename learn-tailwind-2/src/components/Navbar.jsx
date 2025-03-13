import React from 'react';
import BookMark from '../icons/BookMark';

const Navbar = () => {
  return (
    <nav className='flex py-8 px-5 justify-between items-center'>
      <div className='flex gap-2 items-center'>
        <div className='text-white bg-main p-1.5 rounded-2xl items-center justify-center'>
          <BookMark />
        </div>
        <p>BOOKMARK</p>
      </div>
      <div className='flex gap-2 items-center'>
        <button className='p-2 px-6 text-gray-400 border border-transparent hover:border-gray-400 rounded-lg text-sm cursor-pointer'>
          FEATURES
        </button>
        <button className='p-2 px-6 text-gray-400 border border-transparent hover:border-gray-400 rounded-lg text-sm cursor-pointer'>
          DOWNLOADS
        </button>
        <button className='p-2 px-6 text-gray-400 border border-transparent hover:border-gray-400 rounded-lg text-sm cursor-pointer'>
          FAQS
        </button>
        <button className='p-2 px-6 text-white text-sm bg-[#F95858] border-2 rounded-lg hover:bg-white hover:text-[#F95858] hover:border-[#F95858] cursor-pointer'>
          LOGIN
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
