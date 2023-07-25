/*
  * routes\Admin\index.js
  * Author: Jesse Salinas
  * Date: 07/22/2023
*/

import { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

// Context
import { GlobalCtx } from '../../context/GlobalState';

// Components
import { Login } from '../../components/Auth/Login';

export const AdminPortal = () => {
  const { portal, setPortal } = useContext(GlobalCtx);

  const handleAdminLogin = (userData) => {
	console.log('student login data: ', userData);
  }

  useEffect(() => {
	// the effect is set to run once on mount, setting portal to admin, it will run again if the setPortal function changes(unlikely to change). This will avoid any stale closures/bugs.
	if (portal !== 'admin') setPortal('admin');

  }, [ setPortal ]);

  return (
	<Routes>
	  <Route path="/" element={ <Login portal={ portal } onSubmit={ handleAdminLogin } /> } />
	</Routes>
  );

}	
