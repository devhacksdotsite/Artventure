/*
  * components\Calendar\Tooltip\Content.js
  * Author: Jesse Salinas
  * Date: 10/13/2023
*/

import React from 'react';

// Components
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';

import classNames from 'clsx';

// MUI
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

// MUI Icons
import Room from '@mui/icons-material/Room';


const PREFIX = 'Demo';

const classes = {
  icon: `${PREFIX}-icon`,
  textCenter: `${PREFIX}-textCenter`,
  firstRoom: `${PREFIX}-firstRoom`,
  secondRoom: `${PREFIX}-secondRoom`,
  thirdRoom: `${PREFIX}-thirdRoom`,
  header: `${PREFIX}-header`,
  commandButton: `${PREFIX}-commandButton`,
};

const StyledGrid = styled(Grid)(() => ({
  [`&.${classes.textCenter}`]: {
    textAlign: 'center',
  },
}));

const StyledRoom = styled(Room)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: palette.action.active,
  },
}));

export const CustomTooltipContent = (({
  children, appointmentData, ...restProps
}) => (
  <AppointmentTooltip.Content 
    {...restProps} 
    appointmentData={ appointmentData }
  >
    <Grid container alignItems="center">
      <StyledGrid item xs={2} className={classes.textCenter}>
        <StyledRoom className={classes.icon} />
      </StyledGrid>
      <Grid item xs={10}>
        <span>{appointmentData.location || "Room 1" }</span>
      </Grid>
    </Grid>
  </AppointmentTooltip.Content>
));

