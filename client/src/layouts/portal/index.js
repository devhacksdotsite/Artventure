/*
  * layouts\portal\index.js
  * Author: Jesse Salinas
  * Date: 07/28/2023
*/

// MUI
import Box from '@mui/material/Box';

// components
import { Nav } from '../../components/Navbar/';

export const PortalLayout = ({ children }) => {

  return (
      <Box sx={{ display: 'flex' }}>
		<Nav />
	    <Box
          flexGrow='1'
          width='100%'
		  height="100vh"
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
		>
          { children }
        </Box>
	  </Box>
  );
}
