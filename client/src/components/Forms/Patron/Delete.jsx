/*
* @\component\Forms\Patron\Delete.jsx
* Name: PatronDelete
* Author: Jesse Salinas
* Date: 03/02/2024
*/

import { useState, useEffect } from 'react';

import { Link as RouterLink } from 'react-router-dom';

// Hooks
import { useAuth } from '@/hooks/useAuth';

// Utils
import { getData, postData, putData, deleteData } from '@/utils/fetchData';

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

export const PatronDelete = ({ 
  data, 
  setter, 
  method = 'DELETE', 
  filter,  
  closeModal  
}) => {

  console.log('DATA: ', data);

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

    try {
      let response;

      const url = `http://localhost:3050/api/private/admin/clients/${data.client_id}`; 
      response = await deleteData(url, token, logout, filter);

      // Set clients data
      if (response.clients) {
       
        setter(response.clients);
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
        Are you sure you want to delete this Patron?
      </Typography>

	  <Typography>
		By clicking <b>DELETE</b>, the patron will be deactivated, and any associated students will be detached from this patron's account.
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
            color="error" 
            onClick={ handleConfirm }
        >
            Delete
          </Button>
        </Grid>

      </Grid>
    </Paper>
  );
}
