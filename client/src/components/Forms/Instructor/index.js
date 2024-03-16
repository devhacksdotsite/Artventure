/*
* @\component\Forms\Instructor\index.js
* Name: InstructorForm
* Author: Jesse Salinas
* Date: 08/13/2023
*/

import { useState, useEffect } from 'react';

import { Link as RouterLink } from 'react-router-dom';

// Form Validation
import { useForm, Controller } from 'react-hook-form';

// Hooks
import { useAuth } from '@/hooks/useAuth';

// Utils
import { getData, postData, putData, deleteData } from '@/utils/fetchData';

// MUI
import {
  Container,
  Box,
  Avatar,
  Typography, 
  TextField,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Link, 
} from '@mui/material';

// MUI Date Pickers
import { DatePicker } from '@mui/x-date-pickers';

// MUI Icons
import {
  LockOutlined,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

export const InstructorForm = ({ data, setter, method = 'POST', filter, closeModal }) => {


  console.log('data:', data);
  console.log(data?.clearance?.some(clearance => clearance.clearance_type === 'fingerprint'))

  // State
  const [ selectedDateStarted, setSelectedDateStarted ] = useState(null);

  // Hooks
  const { 
	control, 
	handleSubmit, 
	formState: { errors } 
  }  = useForm();

  const { token, logout } = useAuth();

  // Handlers
  const onSubmit = async (formData) => {

    const payload = { ...formData };

    console.log(payload);

    try {
      let response;

      if (method === 'POST') {

        const url = `http://localhost:3050/api/private/admin/instructors`; 
        response = await postData(url, payload, token, logout, filter);


      } else if (method === 'PUT') {

        const url = `http://localhost:3050/api/private/admin/instructors/${data.instructor_id}`; 
        response = await putData(url, payload, token, logout, filter);

        // Check if data is returned
        if (response) {
  
        }

      } else if (method === 'DELETE') {

        const url = `http://localhost:3050/api/private/admin/instructors/${data.instructor_id}`; 
        response = await deleteData(url, token, logout, filter);
      }

      // Set instructor data
      if (response.instructors && response.instructors.length > 0) {
       
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
    <Box component="form" onSubmit={ handleSubmit(onSubmit) } noValidate sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="firstname"
            control={ control }
            defaultValue={ data?.firstname }
            rules={{ 
              required: 'Firstname is required', 
              minLength: {
                value: 2, 
                message: 'Firstname must be atleast 2 characters'
              }
            }}
            render={ ({ field}) => (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Firstname"
                autoComplete="firstname"
                autoFocus
                value={ field.value }
                error={ !!errors.firstname }
                onChange={ (e) => field.onChange(e.target.value) }
                helperText={ errors.firstname?.message }
              /> 
            ) }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="lastname"
            control={ control }
            defaultValue={ data?.lastname }
            rules={{ 
              required: 'Lastname is required', 
              minLength: {
                value: 2, 
                message: 'Lastname must be atleast 2 characters'
              }
            }}
            render={ ({ field}) => (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Lastname"
                autoComplete="lastname"
                autoFocus
                value={ field.value }
                error={ !!errors.lastname }
                onChange={ (e) => field.onChange(e.target.value) }
                helperText={ errors.lastname?.message }
              /> 
            ) }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="dateStarted"
            control={control}
            defaultValue={ data?.date_started }
            render={({ field }) => (
              <TextField
                id="dateStarted"
                label="Start Date"
                type="date"
                defaultValue=""
                sx={{ width: '100%', mt: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={ field.value }
                onChange={ (e) => field.onChange(e.target.value) }
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="dln"
            control={ control }
            defaultValue={ data?.drivers_license_number }
            rules={{ 
              required: 'DL# is required', 
              minLength: {
                value: 8, 
                message: 'DL# must be atleast 8 characters'
              }
            }}
            render={ ({ field}) => (
              <TextField
                margin="normal"
                required
                fullWidth
                label="DL#"
                autoComplete="DL#"
                autoFocus
                value={ field.value }
                error={ !!errors.dln }
                onChange={ (e) => field.onChange(e.target.value) }
                helperText={ errors.dln?.message }
              /> 
            ) }
          />
        </Grid>
        
      </Grid>

      <Controller
        name="address"
        control={ control }
        defaultValue={ data?.address }
        rules={{ 
          required: 'Address is required', 
          minLength: {
            value: 2, 
            message: 'Address must be atleast 2 characters'
          }
        }}
        render={ ({ field}) => (
          <TextField
            margin="normal"
            required
            fullWidth
            label="Address"
            autoComplete="address"
            autoFocus
            value={ field.value }
            error={ !!errors.address }
            onChange={ (e) => field.onChange(e.target.value) }
            helperText={ errors.address?.message }
          /> 
        ) }
      />

      <Controller
        name="email"
        control={ control }
        defaultValue={ data?.email }
        rules={{ 
          required: 'Email is required', 
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
            message: 'Invalid email address'
          }
        }}
        render={ ({ field}) => (
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={ field.value }
            error={ !!errors.email }
            onChange={ (e) => field.onChange(e.target.value) }
            helperText={ errors.email?.message }
          /> 
        ) }
      />

      <Controller
        name="phone"
        control={ control }
        defaultValue={ data?.phone }
        rules={{ 
          required: 'Phone is required', 
          pattern: {
            value: /^[0-9]{10}$/, 
            message: 'Invalid phone'
          }
        }}
        render={ ({ field}) => (
          <TextField
            margin="normal"
            required
            fullWidth
            label="Phone Number"
            autoComplete="phone"
            autoFocus
            value={ field.value }
            error={ !!errors.phone }
            onChange={ (e) => field.onChange(e.target.value) }
            helperText={ errors.phone?.message }
          /> 
        ) }
      />

      {/* Checkbox for Finger Printed */}
      <Controller
        name="fingerPrinted"
        control={ control }
        defaultValue={ data?.clearance?.some(clearance => clearance.clearance_type === 'fingerprint') }
        render={({ field }) => (
          <FormControlLabel
            control={ <Checkbox defaultChecked={ field.value } onChange={ e => field.onChange(e.target.checked) } { ...field } /> }
            label="Finger Printed"
          />
        )}
      />

      {/* Checkbox for Background Check */}
      <Controller
        name="backgroundChecked"
        control={ control }
        defaultValue={ data?.clearance?.some(clearance => clearance.clearance_type === 'background_check') }
        render={({ field }) => (
          <FormControlLabel
            control={ <Checkbox defaultChecked={ field.value } onChange={ e => field.onChange(e.target.checked) } { ...field } /> }
            label="Background Check"
          />
        )}
      />

      <Button 
	    type="submit"
		fullWidth
		variant="contained"
		sx={{ mt: 3, mb: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
}
