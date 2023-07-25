/*
  * routes\Student\index.js
  * Author: Jesse Salinas
  * Date: 07/22/2023
*/

import { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

// Context
import { GlobalCtx } from '../../context/GlobalState';

// Components
import { Login } from '../../components/Auth/Login';
import { Register } from '../../components/Auth/Register';
import { Reset } from '../../components/Auth/Reset';

export const StudentPortal = () => {
  const navigate = useNavigate();

  const { 
	portal, 
	setPortal,
	authenticated,
	setAuthenticated
  } = useContext(GlobalCtx);
  

  const handleStudentLogin = (userData) => {
	console.log('student login data: ', userData);
  }

  if (!authenticated) {
	//navigate('/student/login');
	//return null;
  }

  useEffect(() => {
	// the effect is set to run once on mount, setting portal to admin, it will run again if the setPortal function changes(unlikely to change). This will avoid any stale closures/bugs.
	if (portal !== 'student') setPortal('student');

  }, [ setPortal ]);

  return (
	<Routes>
	  <Route path="/" element={ <Login portal={ portal } onSubmit={ handleStudentLogin } /> } />
	  <Route path="register" element={ <Register portal={ portal } /> } />
	  <Route path="reset" element={ <Reset portal={ portal } /> } />
	</Routes>
  );
}	
