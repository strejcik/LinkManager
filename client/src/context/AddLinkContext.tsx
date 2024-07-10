import { createContext, SetStateAction, Dispatch } from 'react';


interface addLinkContextInterface {
    addLinkResponse: boolean;
    setAddLinkResponse: Dispatch<SetStateAction<boolean>>;
  }


const addLinkContext = createContext<addLinkContextInterface>({
    addLinkResponse: false,
    setAddLinkResponse: () => {},
});

export default addLinkContext;