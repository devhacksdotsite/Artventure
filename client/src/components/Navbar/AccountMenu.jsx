/*
  * component\Navbar\AccountMenu.jsx
  * Author: Jesse Salinas
  * Date: 07/29/2023
*/

import { useState } from 'react';

// MUI
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider, 
  IconButton,
  Typography,
  Tooltip,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

// MUI Icons
import {
  PersonAdd,
  Settings,
  Logout,
} from '@mui/icons-material';

// Hooks
import { useAuth } from '@/hooks/useAuth';

export const AccountMenu = () => {

  // State
  const [ anchorEl, setAnchorEl ] = useState(null);
  const [ school, setSchool ] = useState({ name: 'ArventureOC', code: 'AOC' });

  // Hooks
  const { authenticated, logout } = useAuth();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {

    logout();
  };

  const handleSchoolChange = (event) => {
    const newSchoolCode = event.target.value;
    // Fetch school data here...
    //const newSchoolData = fetchSchoolData(newSchoolCode);
    const newSchoolData = {
      name: 'NewSchool',
      code: 'NS',
    };
    
    // Update the school context using the custom hook
    //updateSchool(newSchoolData);

  };

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={ handleClick }
          size="small"
          sx={{ ml: 2 }}
          aria-controls={ open ? 'account-menu' : undefined }
          aria-haspopup="true"
          aria-expanded={ open ? 'true' : undefined }
        >
          <Avatar alt="user image" src="#" sx={{ width: 32, height: 32 }}>J</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={ anchorEl }
        id="account-menu"
        open={ open }
        onClose={ handleClose }
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* School Change Dropdown */}
        <MenuItem>
          <FormControl fullWidth>
            <InputLabel id="school-dropdown-label">School</InputLabel>
            <Select
              labelId="school-dropdown-label"
              id="school-dropdown"
              value={ school.code }
              onChange={ handleSchoolChange }
            >
              <MenuItem value="AOC">ArtventureOC</MenuItem>
              {/* Add more options as needed */}
            </Select>
          </FormControl>
        </MenuItem>

        <MenuItem onClick={ handleClose }>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={ handleClose }>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={ handleClose }>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={ handleLogout }>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
