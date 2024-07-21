import React, { useState } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import { useLocalStorage } from "@uidotdev/usehooks";

import LoginUserPage from './pages/LoginUserPage/LoginUserPage.tsx';
import RegisterUserPage from './pages/RegisterUserPage/registerUserPage.tsx';
import UserPanelPage from './pages/UserPanelPage/UserPanelPage.tsx';
import NoMatchPage from './pages/NoMatchPage/NoMatchPage.tsx';
import LinkViewsPage from './pages/LinkViewsPage/LinkViewsPage.tsx';

import Root from './components/Root.tsx';
import AddLink from './components/UserPanel/AddLink/AddLink.tsx';
import ManageLink from './components/UserPanel/ManageLink/ManageLink.tsx'
import EditLinkItem from './components/UserPanel/ManageLink/EditLinkItem/EditLinkItem.tsx'

import AuthContext from './context/authContext.tsx';
import AddLinkContext from './context/addLinkContext.tsx';
import cacheContext from './context/cacheContext.tsx';
import lsContext from './context/lsStorageContext.tsx';

import { useBeforeunload } from 'react-beforeunload';




const App = () => {
  const [auth, setAuth] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const [addLinkResponse, setAddLinkResponse] = useState(false);
  const [cache, setCache] = useState(true);
  const [viewsCache, setViewsCache] = useState(true);
  const [ls, setLs] = useLocalStorage<any>("data", []);
  const [viewsLs, setViewsLs] = useLocalStorage<any>("views", []);
  useBeforeunload(() => {
    if (window) localStorage.clear();
      });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root/>}>
        <Route path='login' element={<LoginUserPage />} />
        <Route path='register' element={<RegisterUserPage />} />
          <Route path='panel' element={<UserPanelPage />}>
              <Route path="addlink" element={<AddLink />} />
              <Route path="managelink" element={<ManageLink />}/>
              <Route path="managelink/edit/:id" element={<EditLinkItem />} />
              <Route path="linkviews" element={<LinkViewsPage />} />
          </Route>
        <Route path="*" element={<NoMatchPage />} />
      </Route>
    )
  )

  return (
    <AuthContext.Provider value={{ auth, setAuth, setAccountCreated, accountCreated}}>
      <AddLinkContext.Provider value={{addLinkResponse, setAddLinkResponse}}>
        <cacheContext.Provider value={{cache, setCache, viewsCache, setViewsCache}}>
          <lsContext.Provider value={{ls, setLs, viewsLs, setViewsLs}}>
            <RouterProvider router={router} />
          </lsContext.Provider>
        </cacheContext.Provider>
      </AddLinkContext.Provider>
    </AuthContext.Provider>

  )
};

export default App;