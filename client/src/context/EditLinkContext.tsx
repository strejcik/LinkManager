import { createContext, SetStateAction, Dispatch } from 'react';


interface editLinkContextInterface {
    linkResponse: String;
    setLinkResponse: Dispatch<SetStateAction<string>>;
  }


const editLinkContext = createContext<editLinkContextInterface>({
    linkResponse: '',
    setLinkResponse: () => {},
});

export default editLinkContext;