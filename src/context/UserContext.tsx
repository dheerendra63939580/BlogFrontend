import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import type { UserData } from '../types/types';

interface MyContextType {
  userInfo: UserData
  setUserInfo: Dispatch<SetStateAction<UserData>>
}
const MyContext = createContext<MyContextType | undefined>(undefined);
interface MyProviderProps {
  children: ReactNode
}

export const UserContextMyProvider = ({ children }: MyProviderProps) => {
  const [userInfo, setUserInfo] = useState<UserData>({
    _id: "",
    name: "",
    avatar: ""
  });

  return (
    <MyContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook with safety check
export const useUserContext = (): MyContextType => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};
