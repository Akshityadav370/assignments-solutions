import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  token: string;
  user: { username: string; shareable: boolean; userId: string } | undefined;
  configureSession: (params: {
    user: { username: string; shareable: boolean; userId: string };
    token: string;
  }) => void;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: '',
  user: undefined,
  configureSession: () => {},
  logOut: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<
    { username: string; shareable: boolean; userId: string } | undefined
  >(undefined);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const configureSession = ({
    user,
    token,
  }: {
    user: { username: string; shareable: boolean; userId: string };
    token: string;
  }) => {
    try {
      if (token) {
        setToken(token);
        setUser(user);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error setting up the session', error);
    }
  };

  const logOut = () => {
    setUser(undefined);
    setToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <AuthContext.Provider value={{ token, user, configureSession, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
