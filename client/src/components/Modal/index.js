/*
  * component\Modal\index.js
  * Author: Jesse Salinas
  * Date: 08/13/2023
*/

import { useState } from 'react';

// MUI
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton
} from '@mui/material/';

import CloseIcon from '@mui/icons-material/Close';

export const Modal = ({ children, title, subtitle, fullScreen, open, setOpen }) => {

  // handlers
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog 
      fullWidth 
      fullScreen={ fullScreen }
      open={ open } 
      onClose={ handleClose }
    >
      <IconButton
        aria-label="close"
        onClick={ handleClose }
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton> 

      <DialogTitle>{ title }</DialogTitle>

      <DialogContent>
        <DialogContentText>{ subtitle }</DialogContentText>

        { children }
      </DialogContent>

    </Dialog>
  );
}
