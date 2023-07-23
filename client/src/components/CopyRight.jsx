/*
  * components\CopyRight.jsx
  * Author: Jesse Salinas
  * Date: 07/21/2023
*/

// MUI Components
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export const CopyRight = (props) => {
  const date = new Date().getFullYear();

  return (
	<Typography variant="body2" color="text.secondary" align="center" { ...props }>
	  Copyright &copy; { ' ' }
	  <Link color="inherit" href="#">ArtventureOC</Link>
	  { ' ' }{ date }{ '.' }
	</Typography>
  );
}
