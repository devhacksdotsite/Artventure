/*
* @\component\Navbar\AccountMenu.jsx
* Name: AccountMenu
* Author: Jesse Salinas
* Date: 07/29/2023
*/

import { useState } from 'react';

// Data
import { accountMenuListItems } from '@/data/admin/navData';

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

// Components
import { Modal } from '@/components/Modal/';

// Hooks
import { useAuth } from '@/hooks/useAuth';
import { useModal } from '@/hooks/useModal';
import { useNavLinks } from '@/hooks/useNavLinks';

function capitalizeFirstLetter(str) {

  // Check if the string is empty or null
  if (!str) return str;
  
  // Capitalize the first letter and return it
  return str.charAt(0).toUpperCase();
}

export const AccountMenu = ({ user }) => {

  // State
  const [ anchorEl, setAnchorEl ] = useState(null);
  const [ school, setSchool ] = useState({ name: 'ArventureOC', code: 'AOC' });

  // Hooks
  const { modal, openModal, closeModal } = useModal();
  const { mainAccountMenuListItems, secondaryAccountMenuListItems } = useNavLinks();

  const open = Boolean(anchorEl);

  const handleExpand = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCollapse = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {

    logout();
  };

  const handleItemClick = (item) => {

    console.log('item:', item)
    openModal(
      <item.component 
        //rowData={ rowData } 
        elevation={ 0 } 
        backgroundColor="transparent" 
        border="none" 
        closeModal={ closeModal }
      />, 
      item.title, 
      item.subtitle
    );
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
          onClick={ handleExpand }
          size="small"
          sx={{ ml: 2 }}
          aria-controls={ open ? 'account-menu' : undefined }
          aria-haspopup="true"
          aria-expanded={ open ? 'true' : undefined }
        >
          <Avatar 
            alt="user image" 
            src="#" 
            sx={{ width: 32, height: 32 }}
          >
            { capitalizeFirstLetter(user.fullname) }
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={ anchorEl }
        id="account-menu"
        open={ open }
        onClose={ handleCollapse }
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
          style: {
            minWidth: 200, // Maximum height for the menu
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* School Change Dropdown
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
            </Select>
          </FormControl>
        </MenuItem> */}
        
        { mainAccountMenuListItems && mainAccountMenuListItems.map(item => (
          <MenuItem 
            key={ item.id } 
          >
            { item.icon } { item.name }
          </MenuItem>
        )) }

        <Divider />

        { secondaryAccountMenuListItems && secondaryAccountMenuListItems.map(item => (
          <MenuItem onClick={ () => item.component ? handleItemClick(item) : handleCollapse } key={ item.id }>
            <ListItemIcon>
              { item.icon }
            </ListItemIcon>
            { item.name }
          </MenuItem>
        )) }
        
      </Menu>

      <Modal
        open={ modal.open }
        setOpen={ closeModal }
        title={ modal.title }
        subtitle={ modal.subtitle }
      >
        { modal.content }
      </Modal>
    </>
  );
}
