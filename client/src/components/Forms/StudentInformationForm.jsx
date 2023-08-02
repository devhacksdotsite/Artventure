/*
  * components\Forms\StudentInformationForm.jsx
  * Author: Jesse Salinas
  * Date: 07/30/2023
*/

import { useState } from 'react';

// MUI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';

// MUI Icons
import DeleteIcon from '@mui/icons-material/Delete';


export const StudentInformationForm = () => {
  const [students, setStudents] = useState([
    { 
      firstname: '',
      lastname: '',
      dob: '',
      comments: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      phoneNumber: '',
      usePreviousAddress: false,
    },
  ]);

  const [addresses, setAddresses] = useState([]); // Array to store addresses

  // handlers
  const handleStudentChange = (index, field, value) => {
    const updatedStudents = [...students];
    updatedStudents[index][field] = value;
    setStudents(updatedStudents);
  };

  const addAnotherStudent = () => {
    setStudents([
      ...students,
      {
        firstname: '',
        lastname: '',
        dob: '',
        comments: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        phoneNumber: '',
        usePreviousAddress: false,
      },
    ]);
  };

  const removeStudent = (index) => {
    const updatedStudents = [...students];
    updatedStudents.splice(index, 1);
    setStudents(updatedStudents);
  };

  const handleAddressCheckbox = (index) => {
    const updatedStudents = [...students];
    updatedStudents[index].usePreviousAddress = !updatedStudents[index].usePreviousAddress;
    if (updatedStudents[index].usePreviousAddress) {
      updatedStudents[index] = { ...updatedStudents[index], ...addresses[addresses.length - 1] };
    }
    setStudents(updatedStudents);
  };
  return (
    <>
      <Typography variant="h6" gutterBottom>
        New Student Information
      </Typography>
      <Grid container spacing={3}>

        {students.map((student, index) => (
          <>
            { index > 0 && (
              <Grid item xs={ 12 }>
                <Tooltip title="Delete">
                  <IconButton 
                    aria-label="delete"
                    style={{ float: 'right' }}
                    onClick={() => removeStudent(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            ) }

            <Grid item xs={ 12 } sm={ 6 }>
              <TextField
                required
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                variant="standard"
              />
            </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="phone"
              label="Phone"
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
          </Grid>

          { index > 0 && (
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox 
                    color="secondary" 
                    name="saveAddress" 
                    checked={student.usePreviousAddress}
                    onChange={() => handleAddressCheckbox(index)}
                  />
                }
                label="Use the previous address for this student"
              />
            </Grid>
          ) }
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
            />
          </Grid>

          {/* Add a divider after each student information */}
          { index < students.length - 1 && (
            <Grid item xs={ 12 }>
              <Divider style={{ margin: '16px 0' }}>Student { index + 2 }</Divider> 
            </Grid>
          ) }
        </>
        )) } 

        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={addAnotherStudent}>
            Add another student
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
