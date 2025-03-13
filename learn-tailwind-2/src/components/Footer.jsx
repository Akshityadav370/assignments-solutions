import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-[#252B46] text-white py-8'>
      <div className='max-w-6xl mx-auto flex items-center justify-between px-6'>
        <div className='flex items-center gap-12'>
          <div className='flex items-center'>
            <div className='bg-white w-8 h-8 rounded-full flex items-center justify-center'>
              <span className='text-[#5267DF] font-bold text-lg'>B</span>
            </div>
            <span className='ml-2 font-bold'>BOOKMARK</span>
          </div>

          <nav>
            <ul className='flex gap-8 text-sm uppercase tracking-wide'>
              <li>
                <a
                  href='#'
                  className='hover:text-[#FA5959] transition-colors duration-300'
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='hover:text-[#FA5959] transition-colors duration-300'
                >
                  Download
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='hover:text-[#FA5959] transition-colors duration-300'
                >
                  FAQ
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className='flex gap-6'>
          <a
            href='#'
            aria-label='Facebook'
            className='hover:text-[#FA5959] transition-colors duration-300'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'></path>
            </svg>
          </a>
          <a
            href='#'
            aria-label='Twitter'
            className='hover:text-[#FA5959] transition-colors duration-300'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z'></path>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
