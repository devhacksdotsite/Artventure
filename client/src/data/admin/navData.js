/*
  * data\student\navData.js
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

// Admin main links
export const mainListItems = [
  {
    id: uuidv4(),
	name: 'Dashboard',
	url: '/admin/dashboard',
	icon: <DashboardIcon />
  }, {
    id: uuidv4(),
	name: 'Calendar',
	url: '/admin/calendar',
	icon: <CalendarMonthIcon />
  }
];

// Admin secondary links
export const secondaryListItems = [
  {
    id: uuidv4(),
	name: 'Report 1',
	url: '/admin/dashboard',
	icon: <DashboardIcon />
  }, {
    id: uuidv4(),
	name: 'Report 2',
	url: '/admin/calendar',
	icon: <CalendarMonthIcon />
  }
];


