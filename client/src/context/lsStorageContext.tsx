import { createContext, SetStateAction, Dispatch } from 'react';


interface lsContextInterface {
    ls: Array<any>;
    setLs: Dispatch<SetStateAction<any>>;
    viewsLs: Array<any>;
    setViewsLs: Dispatch<SetStateAction<any>>;
  }


const lsContext = createContext<lsContextInterface>({
    ls: [],
    setLs: () => { },
    viewsLs: [],
    setViewsLs: () => { }
});

export default lsContext;