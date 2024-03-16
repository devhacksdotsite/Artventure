/*
* @\component\Forms\Client\Filter.jsx
* Name: FilterForm
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
  Search,
  SearchOff,
} from '@mui/icons-material';

// Styles
const buttonStyle = {
  padding: '10px',
};

export const FilterForm = ({ filter, setFilter, resetFilter, closeModal }) => {

  // Hooks
  const { 
	control, 
	handleSubmit, 
	formState: { errors } 
  }  = useForm();

  const onSubmit = async (formData) => {

    const payload = { ...formData };
    console.log('formData', payload);

    setFilter(payload);
    closeModal();
  }

  const handleFilterReset = () => {

    resetFilter();
    closeModal();
  }

  return (
    <Box component="form" onSubmit={ handleSubmit(onSubmit) } noValidate sx={{ mt: 1 }}>
      <Grid container spacing={2}>

      {/* <Grid item xs={12} sm={6}>
            <Controller
              name="id"
              control={ control }
              defaultValue={ filter.id }
              render={ ({ field}) => (
                <TextField
                  margin="normal"
                  fullWidth
                  label="Search Instructor ID"
                  autoComplete="search"
                  autoFocus
                  value={ field.value }
                  onChange={ (e) => field.onChange(e.target.value) }
                /> 
              ) }
            />
          </Grid>

          <Grid item xs={6} sx={{ display: { xs: 'none', sm: 'block' } }}>
          </Grid> */}

          <Grid item xs={12}>
            <Controller
              name="search"
              control={ control }
              defaultValue={ filter.search }
              render={ ({ field}) => (
                <TextField
                  margin="normal"
                  fullWidth
                  label="Search Patron Name"
                  autoComplete="search"
                  autoFocus
                  value={ field.value }
                  onChange={ (e) => field.onChange(e.target.value) }
                /> 
              ) }
            />
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Patron Status</FormLabel>
              <Controller
                name="status"
                control={control}
                defaultValue={ filter.status }
                render={({ field }) => (
                  <RadioGroup
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    <FormControlLabel value="all" control={<Radio />} label="All" />
                    <FormControlLabel value="active" control={<Radio />} label="Active" />
                    <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
                  </RadioGroup>
                )}
              />
            </FormControl>
          </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>
        
      </Grid>

      <Grid container spacing={2} my={2}>
        <Grid item xs={6}>
          <Button 
	        type="submit"
            fullWidth 
            variant="contained" 
            color="primary" 
            startIcon={ <Search /> }
            style={ buttonStyle }
          >Search</Button>
        </Grid>

        <Grid item xs={6}>
          <Button 
            fullWidth 
            variant="outlined" 
            color="primary" 
            startIcon={ <SearchOff /> }
            style={ buttonStyle }
            onClick={ handleFilterReset }
          >Reset</Button>
        </Grid>
      </Grid>

    </Box>
  );
}
