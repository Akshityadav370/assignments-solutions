'use client';
import { BACKEND_URL } from '@repo/common/types';
import { useState } from 'react';
import axios from 'axios';

const AuthPage = ({ isSignin }: { isSignin: boolean }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onClick = async () => {
    let url = `${BACKEND_URL}/auth`;
    let body = {};
    if (isSignin) {
      url += '/signin';
      body = {
        email,
        password,
      };
    } else {
      url += '/signup';
      body = {
        name,
        email,
        password,
      };
    }
    console.log('url', url);
    const data = await axios.post(url, body, { withCredentials: true });
    if (data.status !== 200) {
      alert('Invalid email/password!');
      return;
    }
    // const { token } = data.data;
    // if (token)
  };

  return (
    <div className='w-screen h-screen flex items-center justify-center bg-slate-900'>
      <div className='flex flex-col items-center gap-4'>
        <h1 className='text-2xl font-bold text-white'>
          {isSignin ? 'Sign In' : 'Sign Up'}
        </h1>
        {!isSignin && (
          <input
            className='border border-gray-300 p-2 rounded placeholder:text-gray-500 text-white'
            type='text'
            placeholder='Name'
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        )}
        <input
          className='border border-gray-300 p-2 rounded placeholder:text-gray-500 text-white'
          type='email'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          className='border border-gray-300 p-2 rounded placeholder:text-gray-500 text-white'
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          onClick={onClick}
          className='bg-blue-500 text-white p-2 rounded'
        >
          {isSignin ? 'Sign In' : 'Sign Up'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
