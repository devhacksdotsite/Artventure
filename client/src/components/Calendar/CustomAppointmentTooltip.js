/*
  * components\Calendar\CustomAppointmentTooltip.js
  * Author: Jesse Salinas
  * Date: 10/05/2023
*/

import React from 'react';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import Room from '@mui/icons-material/Room';

export const CustomAppointmentTooltip = ({ appointmentData, ...restProps }) => {
  const handleButtonClick = () => {
    alert(JSON.stringify(appointmentData)); // Replace with your desired action
  };

  return (
    <>
      <AppointmentTooltip.Header {...restProps}>
        <IconButton onClick={handleButtonClick} size="large">
          <MoreIcon />
        </IconButton>
      </AppointmentTooltip.Header>

      <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
        <Grid container alignItems="center">
          <Grid item xs={2} style={{ textAlign: 'center' }}>
            <Room style={{ color: '#3f51b5' }} />
          </Grid>
          <Grid item xs={10}>
    {/*<span>{appointmentData.location}</span>*/}
          </Grid>
        </Grid>
      </AppointmentTooltip.Content>
    </>
  );
};


