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

// Layouts
import { PortalLayout } from '../../layouts/portal/';

// Components
import { Login } from '../../components/Auth/Login';
import { Reset } from '../../components/Auth/Reset';

import { RequireAuth } from '../../components/Auth/';

// Routes
import { Dashboard } from './Dashboard';
import { Calendar } from './Calendar';
import { Instructors } from './Instructors';
import { Students } from './Students';
import { Patrons } from './Patrons';
import { Attendance } from './Attendance';

export const AdminPortal = () => {
  const navigate = useNavigate();
  const { authenticated, login, logout } = useAuth();

  const { portal, setPortal } = useContext(GlobalCtx);

  const handleAdminLogin = async (userData) => {
	// Login
    const user = await login(userData);

    if (!user) {
      //throw new Error('Network response was not ok');
      alert('Failed to authenticate user.');
      return;
    }
    
    navigate('dashboard');
  }

  useEffect(() => {
	// the effect is set to run once on mount, setting portal to admin, it will run again if the setPortal function changes(unlikely to change). This will avoid any stale closures/bugs.
	if (portal !== 'admin') setPortal('admin');

  }, [ setPortal ]);

  return (
	<Routes>

      { /* Unauthenticated Routes */ }
	  <Route path="reset" element={ <Reset portal={ portal } /> } />

      { /* Authenticated Routes */ }
	  <Route 
		path="dashboard" 
		element={ 
		  <RequireAuth>
            <PortalLayout>
			  <Dashboard /> 
            </PortalLayout>
		  </RequireAuth>
		} 
      />

	  <Route 
		path="calendar" 
		element={ 
		  <RequireAuth>
            <PortalLayout>
			  <Calendar /> 
            </PortalLayout>
		  </RequireAuth>
		} 
      />

	  <Route 
		path="instructors" 
		element={ 
		  <RequireAuth>
            <PortalLayout>
			  <Instructors /> 
            </PortalLayout>
		  </RequireAuth>
		} 
      />

	  <Route 
		path="students" 
		element={ 
		  <RequireAuth>
            <PortalLayout>
			  <Students /> 
            </PortalLayout>
		  </RequireAuth>
		} 
      />

	  <Route 
		path="patrons" 
		element={ 
		  <RequireAuth>
            <PortalLayout>
			  <Patrons /> 
            </PortalLayout>
		  </RequireAuth>
		} 
      />

	  <Route 
		path="attendance" 
		element={ 
		  <RequireAuth>
            <PortalLayout>
			  <Attendance /> 
            </PortalLayout>
		  </RequireAuth>
		} 
      />

      { /* Default Route */ }
	  <Route exact path="/" element={ <Login portal={ portal } onSubmit={ handleAdminLogin } /> } />
	</Routes>
  );

}	
