import React, { useState } from 'react';
import ArrowDown from '../pages/ArrowDown';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='border-b border-gray-200 w-full'>
      <div
        className='flex justify-between items-center w-full p-4 cursor-pointer'
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className='text-gray-700 text-sm hover:text-[#F95858]'>{question}</p>
        <div
          className={`transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <ArrowDown />
        </div>
      </div>
      {isOpen && (
        <div className='p-4 pt-0 text-sm text-gray-500 transition-all duration-300'>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQItem;
