import { useLogin } from '../Hook/UseLogin';
import { decodeToken, client as axiosClient } from '../Services/AuthService';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  handleLogin: (email: string, password: string) => Promise<any>;
  isLoading: boolean;
  isError: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  const {
    mutateAsync: loginMutation,
    isPending: isLoading,
    isError,
  } = useLogin();

  const handleLogin = async (email: string, password: string) => {
    try {
      const newToken = await loginMutation({ email, password });
      setToken(newToken);
      localStorage.setItem('authToken', newToken);
      axiosClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      const data = decodeToken(newToken); 
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    delete axiosClient.defaults.headers.common['Authorization'];
    setToken(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      axiosClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        handleLogin,
        isLoading,
        isError,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
