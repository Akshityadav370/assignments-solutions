import { useRef } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { BACKEND_URL } from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const signUp = async () => {
    const username = userNameRef.current?.value;
    const password = passwordRef.current?.value;

    await axios.post(BACKEND_URL + '/api/v1/user/signup', {
      username,
      password,
    });
    navigate('/signin');
    alert('You have signed up!');
  };

  return (
    <div className='h-screen w-screen bg-gray-200 flex justify-center items-center'>
      <div className='bg-white rounded border min-w-48 p-2'>
        <Input reference={userNameRef} placeHolder='Username' type='text' />
        <Input reference={passwordRef} placeHolder='Password' type='password' />
        <div className='flex justify-center py-4'>
          <Button
            onClick={signUp}
            variant='primary'
            text='Sign Up'
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
