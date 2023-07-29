/*
  * data\navData.js
  * Author: Jesse Salinas
  * Date: 07/25/2023
*/

import { v4 as uuidv4 } from 'uuid'; // Import the UUID generator

// MUI Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

// Student main links
export const mainListItems = [
  {
    id: uuidv4(),
	name: 'Dashboard',
	url: '/student/dashboard',
	icon: <DashboardIcon />
  }, {
    id: uuidv4(),
	name: 'Calendar',
	url: '/student/calendar',
	icon: <CalendarMonthIcon />
  }
];

// Student secondary links
export const secondaryListItems = [
  {
    id: uuidv4(),
	name: 'Dashboard',
	url: '/student/dashboard',
	icon: <DashboardIcon />
  }, {
    id: uuidv4(),
	name: 'Calendar',
	url: '/student/calendar',
	icon: <CalendarMonthIcon />
  }
];

