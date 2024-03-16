/*
* @\data\student\navData.js
* Name: navData
* Author: Jesse Salinas
* Date: 07/25/2023
*/

import { v4 as uuidv4 } from 'uuid'; // Import the UUID generator

// MUI
import {
  Avatar,
} from '@mui/material';

// MUI Icons
import {
  PersonAdd,
  Settings,
  Logout,
} from '@mui/icons-material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ChecklistIcon from '@mui/icons-material/Checklist';
import RuleIcon from '@mui/icons-material/Rule';
import SchoolIcon from '@mui/icons-material/School';
import SummarizeIcon from '@mui/icons-material/Summarize';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import PaletteIcon from '@mui/icons-material/Palette';

// Components
import { Account } from '@/components/Forms/Account/'
import { Settings as AccountSettings } from '@/components/Forms/Account/Settings';

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
  }, /*{
    id: uuidv4(),
	name: 'Schools',
	url: '/admin/schools',
	icon: <SchoolIcon />
  }, */ {
    id: uuidv4(),
	name: 'Patrons',
	url: '/admin/patrons',
	icon: <GroupsIcon />
  }, {
    id: uuidv4(),
	name: 'Students',
	url: '/admin/students',
	icon: <PaletteIcon />
  }, {
    id: uuidv4(),
	name: 'Instructors',
	url: '/admin/instructors',
	icon: <SchoolIcon />
  }, {
    id: uuidv4(),
	name: 'Attendance',
	url: '/admin/attendance',
	icon: <RuleIcon />
  }
];

// Admin secondary links
export const secondaryListItems = [
  {
    id: uuidv4(),
	name: 'Students Report',
	url: '/admin/reports/students',
	icon: <SummarizeIcon />
  },
];

export const accountMenuMainListItems = [
  {
    id: uuidv4(),
	name: 'My Account',
	icon: <Avatar />,
    component: Account, 
    title: 'My Account',
    subtitle: 'Account details'
  }, 
]

export const accountMenuSecondaryListItems = [
  /*{
    id: uuidv4(),
	name: 'Add another account',
	icon: <PersonAdd fontSize="small" />

  },*/ 
  {
    id: uuidv4(),
	name: 'Settings',
	icon: <Settings />,
    component: AccountSettings, 
    title: 'Settings',
  }, {
    id: uuidv4(),
	name: 'Logout',
	url: '/admin/reports/clients',
	icon: <Logout />
  }
]


