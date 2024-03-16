/*
* @\component\Forms\Student\index.js
* Name: StudentForm
* Author: Jesse Salinas
* Date: 02/05/2024
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
  FormControl,
  InputLabel,
  Select, 
  MenuItem,
  Checkbox,
  Button,
  Grid,
  Link, 
  RadioGroup, 
  FormControlLabel, 
  Radio 
} from '@mui/material';

// MUI Date Pickers
import { DatePicker } from '@mui/x-date-pickers';

// MUI Icons
import {
  LockOutlined,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

export const StudentForm = ({ data, setter, method = 'POST', filter, closeModal }) => {

  // State
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const [ selectedDateStarted, setSelectedDateStarted ] = useState(null);
  const [ clients, setClients ] = useState([]);

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

    try {
      let response;

      if (method === 'POST') {

        const url = `http://localhost:3050/api/private/admin/students`; 
        response = await postData(url, payload, token, logout, filter);


      } else if (method === 'PUT') {

        const url = `http://localhost:3050/api/private/admin/students/${data.student_id}`; 
        response = await putData(url, payload, token, logout, filter);

        // Check if data is returned
        if (response) {
  
        }

      } else if (method === 'DELETE') {

        const url = `http://localhost:3050/api/private/admin/students/${data.student_id}`; 
        response = await deleteData(url, token, logout, filter);
      }

      // Set student data
      if (response.students && response.students.length > 0) {
       
        setter(response.students);
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

  useEffect(() => {

    // Get the active client list
    const fetchData = async () => {

      setLoading(true);

      try {

        const response = await getData('http://localhost:3050/api/private/admin/clients/active', token, logout);

        // Set local state
        setClients(response.clients);

        setLoading(false);

      } catch (error) {

        setLoading(false);
        setError(error.message);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: { error }</div>;
  }

  return (
    <Box component="form" onSubmit={ handleSubmit(onSubmit) } noValidate sx={{ mt: 1 }}>
      <Grid container spacing={2}>

        <Grid item xs={12} sm={6}>
          <Controller
            name="clientId"
            control={ control }
            defaultValue={ data?.client_id }
            rules={{ required: 'Client is required' }}
            render={({ field }) => (
              <FormControl fullWidth error={ !!errors.clientId } margin="normal" required>
                <InputLabel id="clientId-label">Select Client</InputLabel>
                <Select
                  labelId="clientId-label"
                  required
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={ !!errors.clientId }
                  helperText={ errors.clientId?.message }
                >
                  { clients?.map((client) => (
                    <MenuItem key={ client.client_id } value={ client.client_id }>
                      ({ client.client_id }) { client.fullname }
                    </MenuItem>
                  )) }
                </Select>
              </FormControl>
            )}
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

        <Grid item xs={12} sm={12}>
          <Controller
            name="birthdate"
            control={ control }
            defaultValue={ data?.birthdate }
            render={({ field }) => (
              <TextField
                id="birthdate"
                label="Birthdate"
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
          <Typography variant="body1" gutterBottom>
            What is the student&apos;s age group?
          </Typography>

          {/* Radio buttons for Age Group */}
          <Controller
            name="ageGroup"
            control={ control }
            defaultValue={ data?.age_group}
            rules={{ 
              required: 'Please select the student\'s age group' 
            }}
            render={({ field }) => (
              <RadioGroup
                value={ field.value }
                onChange={ (e) => field.onChange(e.target.value) }
              >
                <FormControlLabel value="preK" control={<Radio required />} label="Pre-K" />
                <FormControlLabel value="kids" control={<Radio required />} label="Kids" />
                <FormControlLabel value="teens" control={<Radio required />} label="Teens" />
                <FormControlLabel value="adults" control={<Radio required />} label="Adults" />
              </RadioGroup>
            )}
          />
          { errors.ageGroup && (
            <Typography variant="body2" color="error">
              { errors.ageGroup.message }
            </Typography>
          ) }
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="notes"
            control={ control }
            defaultValue={ data?.notes }
            render={({ field }) => (
              <TextField
                { ...field }
                margin="normal"
                fullWidth
                label="Notes"
                multiline
                rows={ 4 }
                autoComplete="notes"
                error={ !!errors.notes }
                helperText={ errors.notes?.message }
              />
            )}
          />
        </Grid>

      </Grid>

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
