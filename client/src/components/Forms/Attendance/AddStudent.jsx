/*
  * component\Forms\Attendance\AddStudent.jsx
  * Author: Jesse Salinas
  * Date: 10/21/2023
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
  Autocomplete,
  TextField,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
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


const students = [
  { name: 'John Doe', avatar: 'https://example.com/johndoe.jpg' },
  { name: 'Jane Doe', avatar: 'https://example.com/janedoe.jpg' },
];

export const AddStudentAttendanceForm = () => {
  const [ showPassword, setShowPassword ] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);

  const { 
	control, 
	handleSubmit, 
	formState: { errors } 
  }  = useForm();
  
  // Handlers
  const handleStudentChange = (event, newValue) => {
    setSelectedStudent(newValue);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
	event.preventDefault();
  };

  const onSubmit = () => {
    console.log('submit the form here');
  }

  return (
    <Box component="form" onSubmit={ handleSubmit(onSubmit) } noValidate sx={{ mt: 1 }}>
      <Controller
        name="student"
        control={control}
        defaultValue={null}
        rules={{ 
          required: 'Please select a student' 
        }} 
        render={({ field }) => (
          <Autocomplete
            {...field}
            value={selectedStudent}
            onChange={handleStudentChange}
            options={students}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <li {...props}>
                <img
                  src={option.avatar}
                  alt={option.name}
                  style={{ marginRight: '8px', borderRadius: '50%', height: '30px' }}
                />
              </li>
            )}
            renderInput={(params) => <TextField {...params} label="Select Student" />}
          />
        )}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="firstname"
            control={ control }
            defaultValue=""
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
            defaultValue=""
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
        
      </Grid>

      <Controller
        name="email"
        control={ control }
        defaultValue=""
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
        defaultValue=""
        rules={{ 
          required: 'Phone is required', 
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
            label="Phone Number"
            autoComplete="phone"
            autoFocus
            value={ field.value }
            error={ !!errors.email }
            onChange={ (e) => field.onChange(e.target.value) }
            helperText={ errors.email?.message }
          /> 
        ) }
      />
    </Box>
  );
}
