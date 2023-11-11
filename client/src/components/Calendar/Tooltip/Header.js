/*
  * components\Calendar\Tooltip\Header.js
  * Author: Jesse Salinas
  * Date: 10/12/2023
*/

import { useState } from 'react';

// Components
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';

// Custom Components
import { Modal } from '../../Modal/';

import classNames from 'clsx';

// MUI
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

// MUI Icons
import MoreIcon from '@mui/icons-material/MoreVert';
import Room from '@mui/icons-material/Room';


// MUI
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider, 
  Typography,
  Tooltip,
} from '@mui/material';

// MUI Icons
import {
  PersonAdd,
  Settings,
  Logout,
} from '@mui/icons-material';

// Hooks
import { useModal } from '../../../hooks/useModal';

// Data
import { modalData } from '../../../data/admin/modalData';

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

const MoreMenu = ({ appointmentData }) => {
  // State
  const [ anchorEl, setAnchorEl ] = useState(null);

  // Hooks
  const { modal, openModal, closeModal } = useModal();

  const ModalData = modalData.attendance;

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const test = () => {
    alert(JSON.stringify(appointmentData));
  }

  /* Attendance */
  const [attendingStudents, setAttendingStudents] = useState([
    { name: 'John Doe', avatar: 'https://example.com/johndoe.jpg' },
    { name: 'Jane Doe', avatar: 'https://example.com/janedoe.jpg' },
    // Add more attending students as needed
  ]);

  const handleCheckIn = (student) => {
    // Implement check-in logic
    console.log(`Checked in ${student.name}`);
  };

  const handleMarkAbsence = (student) => {
    // Implement mark absence logic
    console.log(`Marked absence for ${student.name}`);
  };

  const handleDeleteStudent = (student) => {
    setAttendingStudents((prevStudents) =>
      prevStudents.filter((s) => s.name !== student.name)
    );
  };

  return (
    <>
      <Tooltip title="Event Options">
        <StyledIconButton
          className={ classes.commandButton }
          size="large"
          onClick={ handleClick }
          sx={{ ml: 2 }}
          aria-controls={ open ? 'account-menu' : undefined }
          aria-haspopup="true"
          aria-expanded={ open ? 'true' : undefined }
        >
          <MoreIcon />
        </StyledIconButton>
      </Tooltip>
      <Menu
        anchorEl={ anchorEl }
        id="account-menu"
        open={ open }
        onClose={ handleClose }
        onClick={ handleClose }
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem 
          onClick={() =>
            openModal(<ModalData.add.component />, ModalData.add.title, ModalData.add.subtitle)
          }
        >
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add Student
        </MenuItem>

        <MenuItem onClick={ () => 
          openModal(
            <ModalData.manage.component 
              attendingStudents={ attendingStudents }
              onCheckIn={ handleCheckIn }
              onMarkAbsence={ handleMarkAbsence }
              onDelete={ handleDeleteStudent }
            />, 
            ModalData.manage.title, 
             ModalData.manage.subtitle
          )
        }>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Manage Attendance
        </MenuItem>
      </Menu>

      <Modal
        open={ modal.open }
        setOpen={ closeModal }
        title={ modal.title }
        subtitle={ modal.subtitle }
        fullScreen
      >
        { modal.content }
      </Modal>
    </>
  );
}

export const CustomTooltipHeader = ({
  children, appointmentData, ...restProps
}) => {

    console.log(restProps.commandButtonComponent)
    return (
      <StyledAppointmentTooltipHeader
        { ...restProps }
        className={
          classNames(getClassByLocation(classes, appointmentData.location), classes.header) 
        }
        appointmentData={ appointmentData }
      >
        <>
          <MoreMenu 
            appointmentData={ appointmentData }  
          />
        </>
      </StyledAppointmentTooltipHeader>
  )
}


