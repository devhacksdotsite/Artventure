/*
  * component\Forms\Instructor\FilterOption.jsx
  * Author: Jesse Salinas
  * Date: 08/13/2023
*/

import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// MUI
import {
  Container,
  Paper,
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

export const FilterOptionForm = () => {
  
  // Handlers
  const onSubmit = () => {
    console.log('submit the form here');
  }

  return (
    <Paper
      elevation={ 0 }
      sx={{
        backgroundColor: 'transparent',
      }}
    >
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

      <Grid container spacing={2} my={2}>
        <Grid item xs={6}>
          <Button 
            fullWidth 
            variant="contained" 
            color="primary" 
            startIcon={ <Search /> }
            style={ buttonStyle }
            onClick={ () => search() }
          >Search</Button>
        </Grid>

        <Grid item xs={6}>
          <Button 
            fullWidth 
            variant="outlined" 
            color="primary" 
            startIcon={ <SearchOff /> }
            style={ buttonStyle }
            onClick={ () => clear() }
          >Reset</Button>
        </Grid>
      </Grid>

    </Paper>
  );
}
