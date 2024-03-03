/*
* @\component\Cards\Student\Tag.jsx
* Name: Tag
* Author: Jesse Salinas
* Date: 02/18/2024
*/

import { useState, useEffect } from 'react';

// Data
import { modalData } from '@/data/admin/modalData';

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

// Components
import { Modal } from '@/components/Modal/';

// Hooks
import { useAuth } from '@/hooks/useAuth';
import { useModal } from '@/hooks/useModal';

// Utils
import { getData, postData, putData, deleteData } from '@/utils/fetchData';

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

  // Variables
  const courses = rowData?.courses || ['Drawing Level 1', 'Drawing Level 3', 'Pastels Level 1', 'Acrylic Level 1', 'Water Color Level 1', 'Water Color Level 2'];

  const ModalData = modalData.students;

  // State
  const [ students, setStudents ] = useState([]);
  const [ client, setClient ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  // Handlers
  const editCard = () => handleEdit();
  const deleteCard = () => handleDelete();

  const handleStudentClick = (rowData) => {
    console.log({ rowData });

    openModal(
      <ModalData.tag.component 
        rowData={ rowData } 
        elevation={ 0 } 
        backgroundColor="transparent" 
        border="none" 
      />, 
      ModalData.tag.title, 
      ModalData.tag.subtitle
    );
  }

  // Hooks
  const theme = useTheme();
  const { token, logout } = useAuth();
  const { modal, openModal, closeModal } = useModal();

  useEffect(() => {

    console.log('rowData should be: ', rowData);

    const fetchData = async () => {

      setLoading(true);

      try {

        // Request related students data
        const studentsResponse = await getData(`http://localhost:3050/api/private/admin/students/${ rowData.student_id }/related`, token, logout, { clientId: rowData.client_id });

        // Request client data
        const clientResponse = await getData(`http://localhost:3050/api/private/admin/clients/${ rowData.client_id }`, token, logout);

        // Use Promise.all to wait for both requests to complete
        await Promise.all([ studentsResponse, clientResponse ]);
 
        // Set data
        setStudents(studentsResponse.students);
        setClient(clientResponse.client);

        setLoading(false);

      } catch (error) {

        setLoading(false);
        setError(error.message);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <>
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

        {/* Student Information */}
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
                Student Information
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography>
                Full Name: { rowData.fullname }
              </Typography>
              <Typography>
                Date Started: { rowData.date_started }
              </Typography>
            </Grid>
          </Grid>

          {/* Student Notes */}
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
                Notes
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography>
                { rowData.notes }
              </Typography>
            </Grid>
          </Grid>

          {/* Client Account */}
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
                Sponsor
              </Typography>
            </Grid>

            { client && client.map((cli, index) => (
              <Grid item key={ index }>
                <Chip 
                  label={ cli.fullname } 
                  variant="outlined" 
                  color="primary" 
                  onClick={ () => handleStudentClick(cli) }
                />
              </Grid>
            )) || (
              <Grid item>No students records found.</Grid> 
          ) }
        </Grid>

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
                Related
              </Typography>
            </Grid>

            { students && students.map((student, index) => (
              <Grid item key={ index }>
                <Chip 
                  label={ student.fullname } 
                  variant="outlined" 
                  color="primary" 
                  onClick={ () => handleStudentClick(student) }
                />
              </Grid>
            )) || (
              <Grid item>No students records found.</Grid> 
          ) }
        </Grid>
       
          <Typography variant="body2" color="text.secondary" mt={2}>
            Fun Fact:
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>

        </Grid>

      </Paper>

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
};
