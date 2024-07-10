import React, { useState } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';

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

const App = () => {
  const [auth, setAuth] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const [addLinkResponse, setAddLinkResponse] = useState(false);


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
        <RouterProvider router={router} />
      </AddLinkContext.Provider>
    </AuthContext.Provider>

  )
};

export default App;