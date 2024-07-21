import { createContext, SetStateAction, Dispatch } from 'react';


interface cacheContextInterface {
    cache: boolean;
    setCache: Dispatch<SetStateAction<boolean>>;
    viewsCache: boolean;
    setViewsCache: Dispatch<SetStateAction<boolean>>;
  }


const cacheContext = createContext<cacheContextInterface>({
    cache: true,
    setCache: () => { },
    viewsCache: true,
    setViewsCache: () => { },
});

export default cacheContext;