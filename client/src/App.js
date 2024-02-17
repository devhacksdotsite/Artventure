/*
  * App.js
  * Name: App
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

// Route Components
import { AdminPortal } from '@/routes/Admin/';
import { StudentPortal } from '@/routes/Student/'

export default function App() {

  return (
	<Router>
	  <Routes>

		{ /*  Student routes */ }
		<Route path="/student/*" element={ <StudentPortal /> } />

		{ /*  Admin routes */ }
		<Route path="/admin/*" element={ <AdminPortal /> } />

		<Route path="/" element={ <Navigate to="student" /> } />
	  </Routes>
	</Router>
  );
}


