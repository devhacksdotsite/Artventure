/*
  * component\DataVisualization\Masonry\ProfileCard.jsx
  * Author: Jesse Salinas
  * Date: 08/12/2023
*/

import {
  Paper,
  Avatar,
  Typography,
  Button
} from '@mui/material';

export const ProfileCard = ({ rowData, elevation = 0, backgroundColor = 'transparent', border = 'none' }) => {

  return (
    <Paper
      elevation={ elevation }
      sx={{
        backgroundColor,
        border,
        p: 2,
      }}
    >
      <Avatar alt={ rowData?.fullname } src={ rowData?.profileImageUrl } />
      <Typography gutterBottom variant="h5" component="div">
        { rowData?.fullname }
      </Typography>
      <Typography>{ rowData?.address }</Typography>

      <Typography variant="body2" color="text.secondary">
        Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica
      </Typography>

      <Button size="small" variant="contained" color="success">Edit</Button>
      <Button size="small" variant="outlined" color="error">Delete</Button>

    </Paper>
  );
};
