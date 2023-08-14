/*
  * component\Modal\index.js
  * Author: Jesse Salinas
  * Date: 08/13/2023
*/

import { useState } from 'react';

// MUI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Components
import { AddInstructorForm } from '../Forms/Instructor/AddInstructor';

export const Modal = ({ open, setOpen }) =>{

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Instructor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please complete the following information:
          </DialogContentText>

          <AddInstructorForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
