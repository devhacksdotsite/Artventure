/*
* @\component\Forms\Attendance\ManageAttendance.jsx
* Name: ManageAttendance
* Author: Jesse Salinas
* Date: 10/21/2023
*/

import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import {
  Menu,
  MenuItem
} from '@mui/material/';

// MUI Icons
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const ManageAttendanceForm = ({ 
  attendingStudents, 
  onCheckIn, 
  onMarkAbsence, 
  onDelete 
}) => {

  // State
  const [anchorEl, setAnchorEl] = useState(null);

  // Handlers
  const handleMore = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Student</TableCell>
            <TableCell>Details</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { attendingStudents.map((student) => (
            <TableRow key={student.name}>
              <TableCell>
                <img
                  src={ student.avatar }
                  alt={ student.name }
                  style={{ marginRight: '8px', borderRadius: '50%', height: '30px' }}
                />
                {student.name}
              </TableCell>
              <TableCell>
                RST
              </TableCell>
              <TableCell>
                Pending...
              </TableCell>
              <TableCell>
                <Tooltip title="Check In">
                  <IconButton onClick={() => onCheckIn(student)}>
                    <EventAvailableIcon color="success" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Absent">
                  <IconButton onClick={() => onMarkAbsence(student)}>
                    <EventBusyIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Actions">
                  <IconButton onClick={ handleMore }>
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>

                <Menu
                  anchorEl={ anchorEl }
                  open={ Boolean(anchorEl) }
                  onClose={ handleClose }
                >
                  <MenuItem onClick={onCheckIn}>
                    <EventAvailableIcon color="success" />
                  Check In
                  </MenuItem>

                  <MenuItem onClick={onMarkAbsence}>
                    <EventBusyIcon />
                    Mark Absence
                  </MenuItem>
                </Menu>

              </TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>
  );
};


