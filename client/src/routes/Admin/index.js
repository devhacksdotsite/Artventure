/*
  * routes\Admin\index.js
  * Author: Jesse Salinas
  * Date: 07/22/2023
*/

import { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

// Context
import { GlobalCtx } from '../../context/GlobalState';

// Hooks
import { useAuth } from '../../hooks/useAuth';

// Components
import { Login } from '../../components/Auth/Login';
import { Reset } from '../../components/Auth/Reset';

import { RequireAuth } from '../../components/Auth/';
import { Dashboard } from './Dashboard';

export const AdminPortal = () => {
  const navigate = useNavigate();
  const { authenticated, login, logout } = useAuth();

  const { portal, setPortal } = useContext(GlobalCtx);

  const handleAdminLogin = (userData) => {
	console.log('Admin login data: ', userData);

	// Login
    login().then((res) => {

	  // Send to the Admin Portal Dashboard
	  navigate('dashboard');
	});
  }

  useEffect(() => {
	// the effect is set to run once on mount, setting portal to admin, it will run again if the setPortal function changes(unlikely to change). This will avoid any stale closures/bugs.
	if (portal !== 'admin') setPortal('admin');

  }, [ setPortal ]);

  return (
	<Routes>
	  <Route path="reset" element={ <Reset portal={ portal } /> } />

	  <Route 
		path="dashboard" 
		element={ 
		  <RequireAuth>
			<Dashboard /> 
		  </RequireAuth>
		} />

	  <Route exact path="/" element={ <Login portal={ portal } onSubmit={ handleAdminLogin } /> } />
	</Routes>
  );

}	
