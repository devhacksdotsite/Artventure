/*
* @\component\Navbar\index.js
* Name: Nav
* Author: Jesse Salinas
* Date: 07/25/2023
*/

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Hooks
import { useThemeMode } from '@/hooks/useThemeMode';
import { useNavLinks } from '@/hooks/useNavLinks';
import { useGreeting } from '@/hooks/useGreeting';

// Components
import { AccountMenu } from '@/components/Navbar/AccountMenu';
import { NavItem } from '@/components/Navbar/NavItem';

// MUI
import { styled } from '@mui/material/styles';
import {
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
  Box,
  Divider,
  List,
  Toolbar,
  Typography,
  Tooltip, 
  IconButton,
  Badge,
  Hidden,
  ListItemButton, 
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';

// MUI Icons
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Brightness7,
  Brightness4,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';

// handlers
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

export const Nav = () => {

  // State
  const navigate = useNavigate();
  const [ open, setOpen ] = useState(true);

  // Hooks
  const { darkMode, handleDarkMode } = useThemeMode();
  const { mainListItems, secondaryListItems } = useNavLinks();
  const { timeOfDay, user } = useGreeting();

  // handlers
  const toggleDrawer = () => {
	setOpen(!open);
  }

  return (
	<>
	  <AppBar position="absolute" open={ open }>
		<Toolbar
		  sx={{
			pr: '24px', // keep right padding when drawer closed
		  }}
		>
		  <IconButton
			edge="start"
			color="inherit"
			aria-label="open drawer"
			onClick={toggleDrawer}
			sx={{
			  marginRight: '36px',
			  ...(open && { display: 'none' })
			}}
		  >
			<MenuIcon />
		  </IconButton>	

		  <Typography
			component="h1"
			variant="h6"
			color="inherit"
			noWrap
			sx={{ flexGrow: 1 }}
		  >
            { timeOfDay }, { user.fullname }!
		  </Typography>

		  <IconButton color="inherit">
			<Badge badgeContent={4} color="secondary">
			  <NotificationsIcon />
			</Badge>
		  </IconButton>

          {/* Toggle dark theme component */}
          <Tooltip title="Toggle dark mode">
            <IconButton color="inherit" onClick={() => handleDarkMode()}>
              {darkMode ? (
                <Brightness7 fontSize="small" />
              ) : (
                <Brightness4 fontSize="small" />
              )}
            </IconButton>
          </Tooltip>

          <AccountMenu user={ user }/>
		</Toolbar>
	  </AppBar>

	  <Hidden mdUp>
		<MuiDrawer
		  variant="temporary"
		  open={ open }
		  onClose={ toggleDrawer }
		  ModalProps={{
			keepMounted: true, // Better open performance on mobile.
		  }}
		  sx={{
			//display: { xs: 'block', sm: 'none' },
			'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
		  }}
		>
			<Toolbar
			  sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'flex-end',
				px: [1],
			  }}
			>
              <Box
                component="img"
                sx={{
                  m: 1,
                  height: 44,
                }}
                alt="Artventure Logo."
                src="https://www.artventureoc.com/uploads/3/1/0/6/31060537/published/artventurelogo-horz-rgb.png?1602521733"
              />
			  <IconButton onClick={ toggleDrawer }>
				<ChevronLeftIcon />
			  </IconButton>
			</Toolbar>
			<Divider />
			<List component="nav">
              { mainListItems && mainListItems.map((item, idx) => (
                <NavItem 
                  key={ item.id }
                  name={ item.name }
                  url={ item.url }
                  icon={ item.icon }
                />
              )) }
              <Divider sx={{ my: 1 }} />
              <ListSubheader component="div" inset>
                Saved reports
              </ListSubheader>
              { secondaryListItems && secondaryListItems.map((item, idx) => (
                <NavItem 
                  key={ item.id }
                  name={ item.name }
                  url={ item.url }
                  icon={ item.icon }
                />
              )) }
			</List>
		</MuiDrawer>
	  </Hidden>

	  <Hidden mdDown>
		<Drawer variant="permanent" open={open}>
		  <Toolbar
			sx={{
			  display: 'flex',
			  alignItems: 'center',
			  justifyContent: 'flex-end',
			  px: [1],
			}}
		  >
            <Box
              component="img"
              sx={{
                m: 1,
                height: 44,
              }}
              alt="Artventure Logo."
              src="https://www.artventureoc.com/uploads/3/1/0/6/31060537/published/artventurelogo-horz-rgb.png?1602521733"
            />
			<IconButton onClick={ toggleDrawer }>
			  <ChevronLeftIcon />
			</IconButton>
		  </Toolbar>
		  <Divider />
		  <List component="nav">
			{ mainListItems && mainListItems.map((item, idx) => (
			  <NavItem 
                key={ item.id }
				name={ item.name }
				url={ item.url }
				icon={ item.icon }
			  />
			)) }
			<Divider sx={{ my: 1 }} />
            <ListSubheader component="div" inset>
              Saved reports
            </ListSubheader>
			{ secondaryListItems && secondaryListItems.map((item, idx) => (
			  <NavItem 
                key={ item.id }
				name={ item.name }
				url={ item.url }
				icon={ item.icon }
			  />
			)) }
		  </List>
		</Drawer>
	  </Hidden>
	</>
  );
}

