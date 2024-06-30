import { createContext, SetStateAction, Dispatch } from 'react';


interface AddLinkContextInterface {
    addLinkResponse: boolean;
    setAddLinkResponse: Dispatch<SetStateAction<boolean>>;
  }


const AddLinkContext = createContext<AddLinkContextInterface>({
    addLinkResponse: false,
    setAddLinkResponse: () => {},
});

export default AddLinkContext;