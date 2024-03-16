/*
* @\component\Forms\Instructor\Reactivate.jsx
* Name: InstructorReactivate
* Author: Jesse Salinas
* Date: 03/10/2024
*/

import { useState, useEffect } from 'react';

import { Link as RouterLink } from 'react-router-dom';

// Hooks
import { useAuth } from '@/hooks/useAuth';

// Utils
import { patchData } from '@/utils/fetchData';

// MUI
import {
  Container,
  Paper,
  Avatar,
  Typography, 
  IconButton,
  Button,
  Grid,
  Link, 
} from '@mui/material';

// MUI Icons
import {
  LockOutlined,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

export const InstructorReactivate = ({ 
  data, 
  setter, 
  method = 'PATCH', 
  filter,  
  closeModal  
}) => {

  // State
  const [ confirmationDialogOpen, setConfirmationDialogOpen ] = useState(false);

  // Hooks
  const { token, logout } = useAuth();

  // Handlers
  const handleOpenConfirmationDialog = () => {
    setConfirmationDialogOpen(true);
  };

  const handleCloseConfirmationDialog = () => closeModal();

  const handleConfirm = async () => {
    await onSubmit(data);

    // Close the confirmation dialog
    handleCloseConfirmationDialog();
  };

  const onSubmit = async (formData) => {

    const payload = { ...formData };

    console.log({ payload });

    try {
      let response;

      const url = `http://localhost:3050/api/private/admin/instructors/active/${data.instructor_id}`; 
      response = await patchData(url, payload, token, logout, filter);

      // Set instructors data
      if (response.instructors) {
       
        setter(response.instructors);
      } else {

        alert('Oops, something went wrong.');
      }

    } catch (error) {

      // throw error
      console.log(error);

      // handle error here. 
    } finally {

      closeModal();
    }

  }

  return (
    <Paper
      elevation={ 0 }
      sx={{
        backgroundColor: 'transparent',
      }}
    >
      <Typography variant="h6" color="error">
        Are you sure you want to reactivate this Instructor?
      </Typography>

	  <Typography>
		By clicking <b>REACTIVATE</b>, the instructor will be re-activated.
	  </Typography>

      <Grid container spacing={2} my={2}>
        <Grid item xs={3}>
          <Button 
            fullWidth 
            variant="outlined" 
            color="primary" 
            onClick={ handleCloseConfirmationDialog } 
          >
            Cancel
          </Button>
        </Grid>

        <Grid item xs={3}>
          <Button 
            fullWidth 
            variant="contained" 
            color="success" 
            onClick={ handleConfirm }
        >
            Reactivate
          </Button>
        </Grid>

      </Grid>
    </Paper>
  );
}
