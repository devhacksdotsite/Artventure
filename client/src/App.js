/*
  * App.js
  * Author: Jesse Salinas
  * Date: 07/20/2023
*/

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link
} from 'react-router-dom';

// Context
import { GlobalProvider } from './context/GlobalState';

// Route Components
import { AdminPortal } from './routes/Admin/';
import { StudentPortal } from './routes/Student/';

export default function App() {
  return (
	<GlobalProvider>

	<Router>
		{ /*  route refs */ }
		<nav>
		  <ul>
			<li>
			  <Link to="/admin">admin</Link>
			</li>
			<li>
			  <Link to="/student">Student Portal</Link>
			</li>
			<li>
			  <Link to="/student/register">Student Register</Link>
			</li>
			<li>
			  <Link to="/student/reset">Student Reset</Link>
			</li>
		  </ul>
		</nav>

		<Routes>

		  { /*  Student routes */ }
		  <Route path="/student/*" element={ <StudentPortal /> } />

		  { /*  Admin routes */ }
		  <Route path="/admin/*" element={ <AdminPortal /> } />

		  <Route path="/" element={ <Navigate to="student" /> } />
		</Routes>
	  </Router>
	</GlobalProvider>
  );
}


