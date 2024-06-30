import { createContext, SetStateAction, Dispatch } from 'react';


interface AuthContextInterface {
    auth: boolean;
    setAuth: Dispatch<SetStateAction<boolean>>;
    accountCreated: boolean;
    setAccountCreated: Dispatch<SetStateAction<boolean>>;
  }


const AuthContext = createContext<AuthContextInterface>({
    auth: false,
    setAuth: () => { },
    accountCreated: false,
    setAccountCreated: () => { }
});

export default AuthContext;