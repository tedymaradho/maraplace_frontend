import { createContext, useState, Dispatch, SetStateAction } from 'react';

interface IUser {
  currentUser: string;
  setCurrentUser: Dispatch<SetStateAction<string>>;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
}

export const UserContext = createContext<IUser>({
  currentUser: '',
  setCurrentUser: () => {},
  token: '',
  setToken: () => {},
});

export const UserProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState('');
  const [token, setToken] = useState('');

  const value = { currentUser, setCurrentUser, token, setToken };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
