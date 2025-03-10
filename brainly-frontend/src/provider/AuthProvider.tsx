import { createContext, useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  token: string;
  user: string | undefined;
  configureSession: (params: { username: string; token: string }) => void;
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
  const [user, setUser] = useState<string | undefined>(undefined);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const navigate = useNavigate();

  const configureSession = ({
    username,
    token,
  }: {
    username: string;
    token: string;
  }) => {
    try {
      if (token) {
        setToken(token);
        setUser(username);
        localStorage.setItem('token', token);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error setting up the session', error);
    }
  };

  const logOut = () => {
    setUser('');
    setToken('');
    localStorage.removeItem('token');
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
