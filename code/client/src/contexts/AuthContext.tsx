import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import API from "../app/services/api";
//import API from "../utils/API.mjs";

interface AuthContextType {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used with AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await API.getUserInfo();
        setLoggedIn(true);
        setUser(userData);
      } catch (error) {
        setLoggedIn(false);
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
