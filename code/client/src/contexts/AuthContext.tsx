import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import API from "../app/services/API";
//import API from "../utils/API.mjs";

interface AuthContextType {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  counterId: number | null;
  setCounterId: React.Dispatch<React.SetStateAction<number | null>>;
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
  const [counterId, setCounterId] = useState<number | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await API.getUserInfo();
        setLoggedIn(true);
        setUser(userData);
        console.log(userData.id);
        const counterData = await API.getCounterByUserId(userData.id);
        //console.log(counterData);
        setCounterId(counterData.id);
      } catch (error) {
        setLoggedIn(false);
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  /*useEffect(() => {
    const checkCounter = async () => {
      try {
        console.log("hello", user);
        const counterData = await API.getCounterByUserId(user.id);
        console.log("sss");
        setCounterId(counterData.id);
      } catch (error) {
        setCounterId(null);
      }
    };
    checkCounter();
  }, []);*/

  return (
    <AuthContext.Provider
      value={{ loggedIn, setLoggedIn, user, setUser, counterId, setCounterId }}
    >
      {children}
    </AuthContext.Provider>
  );
};
