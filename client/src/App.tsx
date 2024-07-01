import React, { useState } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';

import LoginUserPage from './pages/loginUserPage/loginUserPage.tsx';
import RegisterUserPage from './pages/registerUserPage/registerUserPage.tsx';
import UserPanelPage from './pages/userPanelPage/userPanelPage.tsx';
import NoMatchPage from './pages/noMatchPage/noMatchPage.tsx';


import Root from './components/Root.tsx';
import AddLink from './components/userPanel/addlink/addlink.tsx';
import ManageLink from './components/userPanel/managelink/manageLink.tsx'
import EditLinkItem from './components/userPanel/managelink/editLinkItem/editLinkItem.tsx'

import AuthContext from './context/AuthContext.tsx';
import AddLinkContext from './context/AddLinkContext.tsx';

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