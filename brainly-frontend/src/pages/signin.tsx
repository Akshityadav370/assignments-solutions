import axios from 'axios';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { BACKEND_URL } from '../config';
import { useRef } from 'react';
import { useAuth } from '../provider/AuthProvider';

const Signin = () => {
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { configureSession } = useAuth();

  const signIn = async () => {
    const username = userNameRef.current?.value;
    const password = passwordRef.current?.value;

    const response = await axios.post(BACKEND_URL + '/api/v1/user/signin', {
      username,
      password,
    });
    configureSession({
      user: {
        username: response.data.username,
        userId: response.data.userId,
        shareable: response.data.shareable,
      },
      token: response.data.token,
    });
  };

  return (
    <div className='h-screen w-screen bg-gray-200 flex justify-center items-center'>
      <div className='bg-white rounded border min-w-48 p-2'>
        <Input placeHolder='Username' reference={userNameRef} type='text' />
        <Input placeHolder='Password' type='password' reference={passwordRef} />
        <div className='flex justify-center py-4'>
          <Button
            onClick={signIn}
            variant='primary'
            text='Sign In'
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
