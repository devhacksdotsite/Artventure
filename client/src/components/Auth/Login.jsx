// routes\Login.js

import { useState } from 'react';

import { Link as RouterLink } from 'react-router-dom';
// Form Validation
import { useForm, Controller } from 'react-hook-form';

// MUI Components
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

// Components
import { CopyRight } from '../../components/CopyRight';

// Transformers
const capitalize = (word) => {
  return word.charAt(0).toUpperCase()
  + word.slice(1);
}

export const Login = ({ onSubmit, portal }) => {
  const [ showPassword, setShowPassword ] = useState(false);
  const portalName = capitalize(portal);

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


  return (
	<Container component="main" maxWidth="xs">
	  <Box 
		sx={{
		  marginTop: 8,
		  display: 'flex',
		  flexDirection: 'column',
		  alignItems: 'center'
		}}
	  >
		
	    <Box
		  component="img"
		  sx={{
			m: 1,
			height: 64,
		  }}
		  alt="Artventure Logo."
		  src="https://www.artventureoc.com/uploads/3/1/0/6/31060537/published/artventurelogo-horz-rgb.png?1602521733"
        />

		<Typography component="h1" variant="h5">{ portalName } Portal</Typography>

		<Box component="form" onSubmit={ handleSubmit(onSubmit) } noValidate sx={{ mt: 1 }}>
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
			  <Link component={ RouterLink } to="reset" variant="body2">Forgot Password?</Link>
			</Grid>

			<Grid item>
			  <Link component={ RouterLink } to="signup" variant="body2">Dont have an account? Sign Up</Link>
			</Grid>
		  </Grid>

		</Box>
	  </Box>

	  <CopyRight sx={{ mt: 8, mb: 4 }} />
	</Container>
  );
}
