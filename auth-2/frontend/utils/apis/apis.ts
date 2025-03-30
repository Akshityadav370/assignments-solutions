/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'sonner';

const customAxios = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  withCredentials: true,
});

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await generateRefreshToken();
        return customAxios(originalRequest);
      } catch (error: any) {
        toast.error('Token refresh failed:', error);
      }
    }
    return Promise.reject(error);
  }
);

export const login = async (
  userInputs: TUserInputs,
  setUserInput: React.Dispatch<React.SetStateAction<TUserInputs>>,
  router: AppRouterInstance
) => {
  try {
    const response = await customAxios.post('/login', {
      name: userInputs.username,
      password: userInputs.password,
    });

    const { data } = response;
    console.log('hi', data?.user);
    const id = data?.user?._id;
    if (response.status === 200) {
      router.push(`/dashboard/${id}`);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setUserInput({ username: '', password: '' });
  }
};

export const signup = async (
  userInputs: TUserInputs,
  setUserInput: React.Dispatch<React.SetStateAction<TUserInputs>>,
  router: AppRouterInstance
) => {
  try {
    const response = await customAxios.post('/signup', {
      name: userInputs.username,
      password: userInputs.password,
    });
    if (response.status === 201) {
      router.push('/');
    }
  } catch (error) {
    console.error(error);
  } finally {
    setUserInput({ username: '', password: '' });
  }
};

export const getTweets = async (
  id: string,
  setTweets: React.Dispatch<React.SetStateAction<Tweets[] | undefined>>
) => {
  try {
    const response = await customAxios.get(`/get-tweets/${id}`, {
      withCredentials: true,
    });
    const { data } = response;
    setTweets(data);
  } catch (error: any) {
    console.error(error);
    toast.error(error?.response?.data?.error?.message);
  }
};

export const generateRefreshToken = async () => {
  try {
    await customAxios.post('/refresh-token', { withCredentials: true });
  } catch (error: any) {
    console.error('Error generating refresh token:', error);
    toast.error(
      error?.response?.data?.error?.message || 'Error generating refresh token'
    );
  }
};
