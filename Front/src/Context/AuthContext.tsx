import { useLogin } from '../Hook/UseLogin';
import { decodeToken, client as axiosClient } from '../Services/AuthService';
import {User} from '../Services/AuthService'
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
  handleLogin: (email: string, password: string) => Promise<User>;
  isLoading: boolean;
  isError: boolean;
  logout: () => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

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
     
      const decodedUser = decodeToken(newToken); 
      setUser(decodedUser); 
      return decodedUser;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

   const logout = () => {
    localStorage.removeItem('authToken');
    delete axiosClient.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      axiosClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

      const decodedUser = decodeToken(storedToken);
      setUser(decodedUser);
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
        user,
        setUser
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
