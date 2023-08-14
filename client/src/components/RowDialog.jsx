/*
  * component\rest of the path here
  * Author: Jesse Salinas
  * Date: 07/22/2023
*/

// RowDialog.js
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Typography,
  Button
} from '@mui/material';

import { ProfileCard } from './DataVisualization/Masonry/ProfileCard';

export const RowDialog = ({ open, onClose, rowData }) => {

  return (
    <Dialog maxWidth="sm" fullWidth={ true } open={ open } onClose={ onClose }>
      <DialogContent>

        <ProfileCard rowData={ rowData } elevation={0} backgroundColor="transparent" border="none" />
      </DialogContent>
    </Dialog>
  );
};


