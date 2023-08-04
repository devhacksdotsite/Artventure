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

// Layouts
import { PortalLayout } from '../../layouts/portal/';

// Components
import { Login } from '../../components/Auth/Login';
import { Signup } from '../../components/Auth/Signup';
import { Reset } from '../../components/Auth/Reset';
import { RequireAuth } from '../../components/Auth/';

// Routes
import { Dashboard } from './Dashboard';
import { Calendar } from './Calendar';
import { Register } from './Register';

export const StudentPortal = () => {
  const navigate = useNavigate();
  const { authenticated, login, logout } = useAuth();

  const { portal, setPortal } = useContext(GlobalCtx);

  const handleStudentLogin = (userData) => {

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

      { /* Unauthenticated Routes */ }
	  <Route path="signup" element={ <Signup portal={ portal } /> } />
	  <Route path="reset" element={ <Reset portal={ portal } /> } />
	  <Route 
        path="register" 
		element={ 
          <Register /> 
		} 
      />

      { /* Authenticated Routes */ }
	  <Route 
		path="dashboard" 
		element={ 
		  <RequireAuth>
            <PortalLayout>
			  <Dashboard /> 
            </PortalLayout>
		  </RequireAuth>
		} />

	  <Route 
		path="calendar" 
		element={ 
		  <RequireAuth>
            <PortalLayout>
			  <Calendar /> 
            </PortalLayout>
		  </RequireAuth>
		} />


      { /* Default Route */ }
	  <Route exact path="/" element={ <Login portal={ portal } onSubmit={ handleStudentLogin } /> } />
	</Routes>
  );
}	
