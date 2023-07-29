/*
  * routes\Student\Dashboard.js
  * Author: Jesse Salinas
  * Date: 07/25/2023
*/

// components
import { Nav } from '../../components/Navbar/';

// MUI
import Box from '@mui/material/Box';

export const Dashboard = () => {

  return (
	<>
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
          <h1>School KPIs</h1>
          <p>Page Body</p>
        </Box>
	  </Box>
	</>
  );
}
