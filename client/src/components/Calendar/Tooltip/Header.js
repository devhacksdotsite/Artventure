/*
  * components\Calendar\Tooltip\Header.js
  * Author: Jesse Salinas
  * Date: 10/12/2023
*/

import React from 'react';

// Components
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';

import classNames from 'clsx';

// MUI
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

// MUI Icons
import MoreIcon from '@mui/icons-material/MoreVert';
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

const getClassByLocation = (location) => {
  if (location === 'Room 1') return classes.firstRoom;
  if (location === 'Room 2') return classes.secondRoom;
  return classes.thirdRoom;
};

const StyledAppointmentTooltipHeader = styled(AppointmentTooltip.Header)(() => ({
  [`&.${classes.firstRoom}`]: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)',
  },
  [`&.${classes.secondRoom}`]: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)',
  },
  [`&.${classes.thirdRoom}`]: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)',
  },
  [`&.${classes.header}`]: {
    height: '260px',
    backgroundSize: 'cover',
  },
}));

const StyledIconButton = styled(IconButton)(() => ({
  [`&.${classes.commandButton}`]: {
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
}));

export const CustomTooltipHeader = (({
  children, appointmentData, ...restProps
}) => (
  <StyledAppointmentTooltipHeader
    { ...restProps }
    className={ classNames(getClassByLocation(classes, appointmentData.location), classes.header) }
    appointmentData={ appointmentData }
  >
    <StyledIconButton
      onClick={
        () => alert(JSON.stringify(appointmentData))
      }
      className={ classes.commandButton }
      size="large"
    >
      <MoreIcon />
    </StyledIconButton>
  </StyledAppointmentTooltipHeader>
));


