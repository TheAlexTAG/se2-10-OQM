/*import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import API from "../app/services/API";
//import API from "../utils/API.mjs";

interface AuthContextType {
  counterId: number | null;
  setCounterId: React.Dispatch<React.SetStateAction<number | null>>;
}

const CounterContext = createContext<AuthContextType | undefined>(undefined);

export const useCounterContext = () => {
  const context = useContext(CounterContext);
  if (context === undefined) {
    throw new Error("useCounterContext must be used with AuthProvider");
  }
  return context;
};

interface CounterProviderProps {
  children: ReactNode;
}

export const CounterProvider = ({ children }: CounterProviderProps) => {
  const [counterId, setCounterId] = useState<number | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const counter = await API.getCounterByUserId();
        setCounterId(counter);
      } catch (error) {
        setCounterId(null);
      }
    };
    checkAuth();
  }, []);

  return (
    <CounterContext.Provider value={{ counterId, setCounterId }}>
      {children}
    </CounterContext.Provider>
  );
};
*/
