/*
  * component\Forms\Instructor\FilterOption.jsx
  * Author: Jesse Salinas
  * Date: 08/13/2023
*/

import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Form Validation
import { useForm, Controller } from 'react-hook-form';

// MUI
import {
  Container,
  Box,
  Avatar,
  Typography, 
  TextField,
  InputAdornment,
  IconButton,
  Checkbox,
  Button,
  Grid,
  Divider,
  Link, 
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@mui/material';

// MUI Icons
import {
  LockOutlined,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

export const FilterOptionForm = () => {
  const { 
	control, 
	handleSubmit, 
	formState: { errors } 
  }  = useForm();
  
  // Handlers
  const onSubmit = () => {
    console.log('submit the form here');
  }

  return (
    <Box component="form" onSubmit={ handleSubmit(onSubmit) } noValidate sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Search"
            autoComplete="search"
            autoFocus
            value=""
          /> 
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Instructor Status</FormLabel>
            <RadioGroup
              column
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="all" control={<Radio />} label="All" />
              <FormControlLabel value="active" control={<Radio />} label="Active" />
              <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>
        
      </Grid>

    </Box>
  );
}
