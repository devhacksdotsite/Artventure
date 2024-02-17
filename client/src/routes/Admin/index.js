/*
  * routes\Admin\index.js
  * Name: AdminPortal
  * Author: Jesse Salinas
  * Date: 07/22/2023
*/

import { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

// Context
import { GlobalCtx } from '@/context/GlobalState';

// Hooks
import { useAuth } from '@/hooks/useAuth';

// Layouts
import { PortalLayout } from '@/layouts/portal/';

// Components
import { Login } from '@/components/Auth/Login';
import { Reset } from '@/components/Auth/Reset';

import { RequireAuth } from '@/components/Auth/';

// Admin Routes
import { Dashboard } from '@/routes/Admin/Dashboard';
import { Calendar } from '@/routes/Admin/Calendar';
import { Instructors } from '@/routes/Admin/Instructors';
import { Students } from '@/routes/Admin/Students';
import { Clients } from '@/routes/Admin/Clients';
import { Attendance } from '@/routes/Admin/Attendance';

export const AdminPortal = () => {

  // Navigation
  const navigate = useNavigate();

  // CTX
  const { portal, setPortal } = useContext(GlobalCtx);

  // Hooks
  const { authenticated, login, logout } = useAuth();

  useEffect(() => {
    // Top level admin component
    
    // GET/SET school data

	// the effect is set to run once on mount, setting portal to admin, it will run again if the setPortal function changes(unlikely to change). This will avoid any stale closures/bugs.
	if (portal !== 'admin') {

      setPortal('admin');
    }

  }, [ setPortal ]);

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

  // Move me to auth hooks...
  const handleAdminLogout = async () => {

	// Login
    const user = await logout();

    if (!user) {

      alert('Failed to logout user.');
      return;
    }

    // logout here...
    
    // navigate('/');
  }

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
              {/* <Dashboard /> */}
              Coming Soon...
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
		path="clients" 
		element={ 
		  <RequireAuth>
            <PortalLayout>
			  <Clients /> 
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

	  <Route 
		path="reports/*" 
		element={ 
		  <RequireAuth>
            <PortalLayout>
              Coming Soon...
            </PortalLayout>
		  </RequireAuth>
		} 
      />

      { /* Default Route */ }
	  <Route exact path="/" element={ <Login portal={ portal } onSubmit={ handleAdminLogin } /> } />
	</Routes>
  );

}	
