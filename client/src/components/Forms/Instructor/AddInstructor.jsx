/*
  * component\Forms\Instructor\AddInstructor.jsx
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

export const AddInstructorForm = () => {
  const [ showPassword, setShowPassword ] = useState('');
  const { 
	control, 
	handleSubmit, 
	formState: { errors } 
  }  = useForm();
  
  // Handlers
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
	event.preventDefault();
  };

  const onSubmit = () => {
    console.log('submit the form here');
  }

  return (
    <Box component="form" onSubmit={ handleSubmit(onSubmit) } noValidate sx={{ mt: 1 }}>
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
        name="password"
        control={ control }
        defaultValue=""
        rules={{ 
          required: 'Password is required', 
          minLength: {
            value: 6, 
            message: 'Password must be atleast 6 characters'
          }
        }}
        render={ ({field}) => (
          <TextField
            margin="normal"
            required
            fullWidth
            label='Password'
            autoComplete="current-password"
            type={ showPassword ? "text" : "password" } 
            InputProps={{ 
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={ handleClickShowPassword }
                    onMouseDown={ handleMouseDownPassword }
                  >
                    { showPassword ? <Visibility /> : <VisibilityOff /> }
                  </IconButton>
                </InputAdornment>
              )
            }}
            value={ field.value }
            onChange={ (e) => field.onChange(e.target.value) }
            error={ !!errors.password }
            helperText={ errors.password?.message } 
          /> 
        ) }
      />

      <FormControlLabel
        control={ 
          <Controller 
            name="rememberMe" 
            control={ control } 
            defaultValue={ false } 
            render={ ({ field }) => <Checkbox color="primary" { ...field } /> } 
          />
        }
        label="Remember me"
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>

      <Grid container>
        <Grid item xs>
          <Link component={ RouterLink } to="/reset" variant="body2">Forgot Password?</Link>
        </Grid>

        <Grid item>
          <Link component={ RouterLink } to="/" variant="body2">Already have an account? Login</Link>
        </Grid>
      </Grid>

    </Box>
  );
}
