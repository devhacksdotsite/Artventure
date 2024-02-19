/*
* @\component\Navbar\Notifications.jsx
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
  ListItemIcon,
  Divider, 
  Typography,
  Select,
  FormControl,
  InputLabel,
  Tooltip, IconButton, Badge, Menu, MenuItem
} from '@mui/material';

// MUI Icons
import {
  PersonAdd,
  Settings,
  Logout,
  Notifications as NotificationsIcon
} from '@mui/icons-material';

// Components
import { Modal } from '@/components/Modal/';

// Hooks
import { useAuth } from '@/hooks/useAuth';
import { useModal } from '@/hooks/useModal';
import { useNavLinks } from '@/hooks/useNavLinks';

export const Notifications = () => {

  // State
  const [ anchorEl, setAnchorEl ] = useState(null);
  const [ notifications, setNotifications ] = useState([
    {
      id: 1,
      message: "New message received",
      time: "10 minutes ago"
    },
    {
      id: 2,
      message: "Meeting reminder: Tomorrow at 2:00 PM",
      time: "1 hour ago"
    },
    {
      id: 3,
      message: "Payment received from John Doe",
      time: "2 hours ago"
    },
  ]);

  // Hooks
  const { modal, openModal, closeModal } = useModal();
  const { mainAccountMenuListItems, secondaryAccountMenuListItems } = useNavLinks();

  //const open = Boolean(anchorEl);

  const handleExpand = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCollapse = () => {
    setAnchorEl(null);
  };

  /*const handleLogout = () => {

    logout();
  };*/

  const handleItemClick = (item) => {

    console.log('item:', item)
    /*openModal(
      <item.component 
        //rowData={ rowData } 
        elevation={ 0 } 
        backgroundColor="transparent" 
        border="none" 
        closeModal={ closeModal }
      />, 
      item.title, 
      item.subtitle
    );*/
  };

  return (
    <>
      <Tooltip title="System Alerts">
        <IconButton color="inherit" onClick={ handleExpand }>
          <Badge badgeContent={ notifications.length } color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={ anchorEl }
        open={ Boolean(anchorEl) }
        onClose={ handleCollapse }
        PaperProps={{
          style: {
            maxHeight: 300, // Maximum height for the menu
            overflowY: 'auto' // Enable vertical scrolling
          },
        }}
      >
        { notifications && notifications.map(notification => (
          <>
            <MenuItem key={ notification.id } onClick={ handleCollapse }>
              <div>
                <Typography variant="subtitle1" color="inherit">
                  <strong>{notification.message}</strong>
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {notification.time}
                </Typography>
              </div> 
            </MenuItem>
            <Divider />
          </>
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
