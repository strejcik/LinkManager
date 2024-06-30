import { createContext, SetStateAction, Dispatch } from 'react';


interface EditLinkContextInterface {
    linkResponse: String;
    setLinkResponse: Dispatch<SetStateAction<string>>;
  }


const EditLinkContext = createContext<EditLinkContextInterface>({
    linkResponse: '',
    setLinkResponse: () => {},
});

export default EditLinkContext;