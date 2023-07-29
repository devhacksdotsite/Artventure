/*
  * components\Navbar\NavItem.js
  * Author: Jesse Salinas
  * Date: 07/27/2023
*/

import { useNavigate } from 'react-router-dom';

// MUI
import {
  ListItemButton, 
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';

export const NavItem = ({ idx, name, url, icon }) => {
  const navigate = useNavigate();

  return (
	<>
	  <ListItemButton
		key={ idx }
		onClick={ () => navigate(url) }
	  >
		<ListItemIcon>
		  { icon }
		</ListItemIcon>
		<ListItemText primary={ name } />
	  </ListItemButton>
	</>
  );
};


