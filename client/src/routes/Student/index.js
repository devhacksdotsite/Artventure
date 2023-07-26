/*
  * routes\Student\index.js
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
import { Register } from '../../components/Auth/Register';
import { Reset } from '../../components/Auth/Reset';

import { RequireAuth } from '../../components/Auth/';
import { Dashboard } from './Dashboard';

export const StudentPortal = () => {
  const navigate = useNavigate();
  const { authenticated, login, logout } = useAuth();

  const { portal, setPortal } = useContext(GlobalCtx);

  const handleStudentLogin = (userData) => {
	console.log('student login data: ', userData);

	// Login
    login().then((res) => {

	  // Send to the Student Portal Dashboard
	  navigate('dashboard');
	});
  }

  useEffect(() => {
	// the effect is set to run once on mount, setting portal to admin, it will run again if the setPortal function changes(unlikely to change). This will avoid any stale closures/bugs.
	if (portal !== 'student') setPortal('student');

  }, [ setPortal ]);

  return (
	<Routes>
	  <Route path="register" element={ <Register portal={ portal } /> } />
	  <Route path="reset" element={ <Reset portal={ portal } /> } />

	  <Route 
		path="dashboard" 
		element={ 
		  <RequireAuth>
			<Dashboard /> 
		  </RequireAuth>
		} />

	  <Route exact path="/" element={ <Login portal={ portal } onSubmit={ handleStudentLogin } /> } />
	</Routes>
  );
}	
