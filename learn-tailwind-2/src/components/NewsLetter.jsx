import React from 'react';
import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }

    // Clear error and handle submission
    setError('');
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <div className='w-full bg-[#5267DF] py-16'>
      <div className='max-w-6xl mx-auto flex flex-col items-center text-white'>
        <p className='uppercase tracking-widest text-sm mb-6'>
          35,000+ already joined
        </p>
        <h2 className='text-4xl font-bold text-center max-w-lg mb-8'>
          Stay up-to-date with what we're doing
        </h2>

        <form onSubmit={handleSubmit} className='flex gap-4 w-full max-w-lg'>
          <div className='relative flex-1'>
            <input
              type='text'
              placeholder='Enter your email address'
              className={`w-full py-3 px-4 rounded-md bg-white placeholder-gray-400 ${
                error ? 'border-2 border-[#F95858]' : ''
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && (
              <div className='absolute -bottom-6 left-0 text-xs text-[#F95858] bg-white rounded px-2 py-1 italic'>
                {error}
              </div>
            )}
          </div>
          <button
            type='submit'
            className='bg-[#F95858] hover:bg-white hover:text-[#F95858] border-2 border-[#F95858] text-white py-3 px-6 rounded-md transition-colors duration-300'
          >
            Contact Us
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
