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
} from '@mui/material/';

export const Modal = ({ children, title, subtitle, open, setOpen }) => {

  // handlers
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog fullWidth={ true } open={ open } onClose={ handleClose }>
      <DialogTitle>{ title }</DialogTitle>
      <DialogContent>
        <DialogContentText>{ subtitle }</DialogContentText>

        { children }
      </DialogContent>

      <DialogActions>
        <Button onClick={ handleClose } variant="outlined">Cancel</Button>
        <Button onClick={ handleClose } variant="contained">Apply</Button>
      </DialogActions>
    </Dialog>
  );
}
