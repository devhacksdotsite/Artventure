/*
* @\component\Forms\Account\Settings.jsx
* Name: Settings 
* Author: Jesse Salinas
* Date: 02/18/2024
*/

import { useState, useEffect } from 'react';

// Hooks
import { useThemeMode } from '@/hooks/useThemeMode';

// MUI
import {
  Paper,
  Typography, 
  Button,
  ButtonGroup,
  Grid,
  Tooltip,
  Divider,
} from '@mui/material';

// MUI Icons
import {
  Brightness7,
  Brightness4,
} from '@mui/icons-material';

export const Settings = ({ data, setter, method = 'DELETE', closeModal  }) => {

  // Hooks
  const { darkMode, handleDarkMode } = useThemeMode();

  // Handlers
  const handleCloseConfirmationDialog = () => closeModal();

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
      }}
    >
      {/* Toggle dark theme component */}
      <Grid container alignItems="center" spacing={2} my={2}>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Set Theme:</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'right' }}>
          <ButtonGroup
            defaultValue={ darkMode }
          >
            <Tooltip title="Set light theme">
              <Button 
                value={ false } 
                variant={ !darkMode ? 'contained' : 'outlined' }
                aria-label="Dark mode off"
                onClick={ () => handleDarkMode(false) }
              >
                <Brightness7 />
              </Button>
            </Tooltip>

            <Tooltip title="Set dark mode">
              <Button 
                value={ true } 
                variant={ !!darkMode ? 'contained' : 'outlined' }
                aria-label="Dark mode on"
                onClick={ () => handleDarkMode(true) }
              >
                <Brightness4 />
              </Button>
            </Tooltip>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Divider />

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
      </Grid>
    </Paper> 
  );
}
