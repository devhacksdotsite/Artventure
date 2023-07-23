/*
  * App.js
  * Author: Jesse Salinas
  * Date: 07/20/2023
*/

import {
  BrowserRouter as Router,
  Routes,
  Route,
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
		{/* Testing code, remove me */}
		<nav>
		  <ul>
			<li>
			  <Link to="/admin">admin</Link>
			</li>
			<li>
			  <Link to="/student">student</Link>
			</li>
		  </ul>
		</nav>

		<Routes>
		  <Route exact path="/" element={ <StudentPortal /> } />
		  <Route exact path="/student" element={ <StudentPortal /> } />
		  <Route exact path="/admin" element={ <AdminPortal /> } />
		</Routes>
	  </Router>
	</GlobalProvider>
  );
}


