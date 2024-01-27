/*
  * component\Forms\DeleteEntry.jsx
  * Name: DeleteEntry 
  * Author: Jesse Salinas
  * Date: 01/26/2024
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

export const DeleteEntry = ({ data, setter, method = 'DELETE', closeModal  }) => {

  // Hooks
  const { token, logout } = useAuth();

  // Handlers
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleOpenConfirmationDialog = () => {
    setConfirmationDialogOpen(true);
  };

  const handleCloseConfirmationDialog = () => closeModal();

  const handleConfirm = async () => {
    //await onSubmit(data);

    // Close the confirmation dialog
    handleCloseConfirmationDialog();
  };

  const onSubmit = async (formData) => {

    const payload = { ...formData };

    if (method === 'POST') {

      const url = `http://localhost:3050/api/private/admin/instructors`; 
      const response = await postData(url, payload, token, logout);
    } else if (method === 'PUT') {

      const url = `http://localhost:3050/api/private/admin/instructors/${data.instructor_id}`; 
      const response = await putData(url, payload, token, logout);
    } else if (method === 'DELETE') {

      const url = `http://localhost:3050/api/private/admin/instructors/${data.instructor_id}`; 
      const response = await deleteData(url, token, logout);
    }

    console.log(response);

  }

  return (
    <Paper
      elevation={ 0 }
      sx={{
        backgroundColor: 'transparent',
      }}
    >
      <Typography>
        Are you sure you want to delete the entry?
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
