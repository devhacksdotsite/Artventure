/*
  * component\Cards\Client\Tag.jsx
  * Name: Tag
  * Author: Jesse Salinas
  * Date: 02/10/2024
*/

// MUI
import {
  Paper,
  Avatar,
  Typography,
  Button,
  Grid,
  Chip,
  Link as MUILink
} from '@mui/material';

// MUI Hooks
import { useTheme } from '@mui/material';

// MUI Icons
import { 
  Edit, 
  Delete,
  CalendarMonth,
} from '@mui/icons-material';

// Styles
const buttonStyle = {
  padding: '10px',
};

// Helpers
const formatPhoneNumber = (phoneNumber) => {
  const cleaned = ('' + phoneNumber).replace(/\D/g, ''); // Remove non-numeric characters
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `+1 (${match[1]}) ${match[2]}-${match[3]}`;
  }

  return phoneNumber; // Return the original number if it doesn't match the expected format
};

export const Tag = ({ rowData, elevation = 0, backgroundColor = 'transparent', border = 'none', handleEdit, handleDelete }) => {

  console.log('rowData is: ', rowData);

  const qualifications = rowData?.qualifications || ['Studio Kids', 'Studio Teens', 'Studio Adults', 'LBASP Drawing', 'LBASP Felting', 'LBSAP Water Color'];
  const courses = rowData?.courses || ['Drawing Level 1', 'Drawing Level 3', 'Pastels Level 1', 'Acrylic Level 1', 'Water Color Level 1', 'Water Color Level 2'];

  // Hooks
  const theme = useTheme();

  // Handlers
  const editCard = () => handleEdit();
  const deleteCard = () => handleDelete();

  return (
    <Paper
      elevation={ elevation }
      sx={{
        backgroundColor,
        border,
        p: 2,
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar 
          alt={ rowData?.fullname } 
          src={ rowData?.profileImageUrl } 
          sx={{ width: 150, height: 150, mb: 2 }}
        />

        <Typography gutterBottom variant="h5" component="div">
          { rowData?.fullname }
        </Typography>

        <Typography component="div">Est. { rowData?.date_started }</Typography>

        <Typography component="div" mt={1}>{ formatPhoneNumber(rowData?.phone) }</Typography>

        <Grid container spacing={2} my={2}>
          <Grid item xs={6}>
            <Button 
              fullWidth 
              variant="contained" 
              color="primary" 
              startIcon={ <Edit /> }
              style={ buttonStyle }
              onClick={ () => editCard() }
            >Edit</Button>
          </Grid>

          <Grid item xs={6}>
            <Button 
              fullWidth 
              variant="outlined" 
              color="error" 
              startIcon={ <Delete /> }
              style={ buttonStyle }
              onClick={ () => deleteCard() }
            >Delete</Button>
          </Grid>
        </Grid>

        {/* Skill set section with header and darkened background */}
        <Grid 
          container 
          spacing={1} 
          mt={2} 
          p={2} 
          sx={{
            backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fff',
            borderRadius: 4,
          }}
        >
          <Grid item xs={12}>
            <Typography variant="h6" color="primary">
              Qualifications
            </Typography>
          </Grid>

          { qualifications.map((qualification, index) => (
            <Grid item key={ index }>
              <Chip label={ qualification } variant="outlined" color="primary" />
            </Grid>
          )) }
        </Grid> 

        {/* Course history set section with header and darkened background */}
        <Grid 
          container 
          spacing={1} 
          mt={2} 
          p={2} 
          sx={{
            backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fff',
            borderRadius: 4,
          }}
        >
          <Grid item xs={12}>
            <Typography variant="h6" color="primary">
              Course History
            </Typography>
          </Grid>

          { courses.map((course, index) => (
            <Grid item key={ index }>
              <Chip label={ course } variant="outlined" color="primary" />
            </Grid>
          )) }
        </Grid> 

      {/* Instructor Information */}
      <Grid 
          container 
          spacing={1} 
          mt={2} 
          p={2} 
          sx={{
            backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fff',
            borderRadius: 4,
          }}
        >
          <Grid item xs={12}>
            <Typography variant="h6" color="primary">
              Instructor Information
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Full Name: {rowData.fullname}
            </Typography>
            <Typography>
              Date Started: {rowData.date_started}
            </Typography>
            <Typography>
              Address: {rowData.address}
            </Typography>
            <Typography>
              Phone: <MUILink href={`tel:${ rowData.phone }`}>{ formatPhoneNumber(rowData.phone) }</MUILink>;
            </Typography>
            <Typography>
              Email: <MUILink href={`mailto:${ rowData.email }`}>{ rowData.email }</MUILink>;
            </Typography>
            {/* Add more fields as needed */}
          </Grid>
        </Grid>
     
        <Typography variant="body2" color="text.secondary" mt={2}>
          Fun Fact:
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>

      </Grid>

    </Paper>
  );
};
