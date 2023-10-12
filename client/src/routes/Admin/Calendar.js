/*
  * routes\Admin\Calendar.js
  * Author: Jesse Salinas
  * Date: 07/28/2023
*/
import React, { useState, useCallback } from 'react';
import Paper from '@mui/material/Paper';
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from '@devexpress/dx-react-scheduler';

import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  ViewSwitcher,
  Toolbar,
  DragDropProvider,
  EditRecurrenceMenu,
  DateNavigator,
  TodayButton,
  AppointmentTooltip,
  AppointmentForm,
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui';


import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import Room from '@mui/icons-material/Room';
import { styled } from '@mui/material/styles';
import classNames from 'clsx';

import { CustomAppointmentTooltip } from '../../components/Calendar/CustomAppointmentTooltip'; 
import { CustomAppointmentForm } from '../../components/Calendar/CustomAppointmentForm'; 
import { EditingOptionsSelector, classes } from '../../components/Calendar/EditingOptionsSelector'; 
import { appointments } from '../../data/demo/appointments';

const owners = [
  {
    text: 'Andrew Glover',
    id: 1,
    color: '#7E57C2',
  }, {
    text: 'Arnie Schwartz',
    id: 2,
    color: '#FF7043',
  }, {
    text: 'John Heart',
    id: 3,
    color: '#E91E63',
  }, {
    text: 'Taylor Riley',
    id: 4,
    color: '#E91E63',
  }, {
    text: 'Brad Farkus',
    id: 5,
    color: '#AB47BC',
  }, {
    text: 'Arthur Miller',
    id: 6,
    color: '#FFA726',
  },
];

const instructors = [{
  fieldName: 'instructorId',
  title: 'Instructor',
  instances: owners,
}];

const PREFIX = 'Demo';

const classes2 = {
  icon: `${PREFIX}-icon`,
  textCenter: `${PREFIX}-textCenter`,
  firstRoom: `${PREFIX}-firstRoom`,
  secondRoom: `${PREFIX}-secondRoom`,
  thirdRoom: `${PREFIX}-thirdRoom`,
  header: `${PREFIX}-header`,
  commandButton: `${PREFIX}-commandButton`,
};

const Header = (({
  children, appointmentData, ...restProps
}) => (
  <StyledAppointmentTooltipHeader
    {...restProps}
    className={classNames(getClassByLocation(classes2, appointmentData.location), classes2.header)}
    appointmentData={appointmentData}
  >
    <StyledIconButton
      /* eslint-disable-next-line no-alert */
      onClick={() => alert(JSON.stringify(appointmentData))}
      className={classes2.commandButton}
      size="large"
    >
      <MoreIcon />
    </StyledIconButton>
  </StyledAppointmentTooltipHeader>
));

const Content = (({
  children, appointmentData, ...restProps
}) => (
  <AppointmentTooltip.Content 
    {...restProps} 
    appointmentData={ appointmentData }
  >
    <Grid container alignItems="center">
      <StyledGrid item xs={2} className={classes2.textCenter}>
        <StyledRoom className={classes2.icon} />
      </StyledGrid>
      <Grid item xs={10}>
        <span>{appointmentData.location || "Room 1" }</span>
      </Grid>
    </Grid>
  </AppointmentTooltip.Content>
));

const StyledAppointmentTooltipHeader = styled(AppointmentTooltip.Header)(() => ({
  [`&.${classes2.firstRoom}`]: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)',
  },
  [`&.${classes2.secondRoom}`]: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)',
  },
  [`&.${classes2.thirdRoom}`]: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)',
  },
  [`&.${classes2.header}`]: {
    height: '260px',
    backgroundSize: 'cover',
  },
}));

const StyledIconButton = styled(IconButton)(() => ({
  [`&.${classes2.commandButton}`]: {
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
}));

const StyledGrid = styled(Grid)(() => ({
  [`&.${classes2.textCenter}`]: {
    textAlign: 'center',
  },
}));

const StyledRoom = styled(Room)(({ theme: { palette } }) => ({
  [`&.${classes2.icon}`]: {
    color: palette.action.active,
  },
}));

const getClassByLocation = (location) => {
  if (location === 'Room 1') return classes2.firstRoom;
  if (location === 'Room 2') return classes2.secondRoom;
  return classes2.thirdRoom;
};


const CommandButton = (({
  ...restProps
}) => (
  <StyledAppointmentTooltipCommandButton 
    {...restProps} 
    className={classes2.commandButton} 
  />
));

export const Calendar = () => {
  const [ data, setData ] = useState(appointments);
  const [ currentDate, setCurrentDate ] = useState(new Date());
  const [ currentView, setCurrentView ] = useState('Month');
  const [ editingOptions, setEditingOptions ] = useState({
    allowAdding: true,
    allowDeleting: true,
    allowUpdating: true,
    allowDragging: true,
    allowResizing: true,
  });
  const [ addedAppointment, setAddedAppointment ] = useState({});
  const [ isAppointmentBeingCreated, setIsAppointmentBeingCreated ] = useState(false);

  const onCommitChanges = useCallback(
    ({ added, changed, deleted }) => {
      console.log({added, changed, deleted});
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;

        setData([...data, { id: startingAddedId, ...added }]);
      }

      if (changed) {
        setData(
          data.map((appointment) =>
            changed[appointment.id]
              ? { ...appointment, ...changed[appointment.id] }
              : appointment
          )
        );
      }

      if (deleted !== undefined) {
        setData(data.filter((appointment) => appointment.id !== deleted));
      }
      setIsAppointmentBeingCreated(false);
    },
    [ setData, setIsAppointmentBeingCreated, data ]
  );

  const onAddedAppointmentChange = useCallback(
    (appointment) => {

      console.log('added...', appointment);
      setAddedAppointment(appointment);
      setIsAppointmentBeingCreated(true);
    },
    []
  );

  const handleEditingOptionsChange = useCallback(
    ({ target }) => {
      const { value } = target;
      const { [value]: checked } = editingOptions;
      setEditingOptions({
        ...editingOptions,
        [value]: !checked,
      });
    },
    [ editingOptions ]
  );

  const TimeTableCell = useCallback(
    React.memo(({ onDoubleClick, ...restProps }) => (
      <WeekView.TimeTableCell
        {...restProps}
        onDoubleClick={
          editingOptions.allowAdding ? onDoubleClick : undefined
        }
      />
    )),
    [ editingOptions.allowAdding ]
  );

  const CommandButton = useCallback(
    ({ id, ...restProps }) => {
      if (id === 'deleteButton') {
        return (
          <AppointmentForm.CommandButton
            id={ id }
            { ...restProps }
            disabled={ !editingOptions.allowDeleting }
          />
        );
      }
      return <AppointmentForm.CommandButton id={id} {...restProps} />;
    },
    [ editingOptions.allowDeleting ]
  );

  const allowDrag = useCallback(
    () => editingOptions.allowDragging && editingOptions.allowUpdating,
    [ editingOptions.allowDragging, editingOptions.allowUpdating ]
  );

  const allowResize = useCallback(
    () => editingOptions.allowResizing && editingOptions.allowUpdating,
    [ editingOptions.allowResizing, editingOptions.allowUpdating ]
  );

  const handleDateChange = (date) => {
    setCurrentDate(date);
  }

  // fix me
  const handleViewChange = (view) => {
    console.log(view);
    setCurrentView(view);
  }

  return (
    <Paper>
      <Scheduler data={ data } height={ 700 }>
        <ViewState 
          currentDate={ currentDate } 
          onCurrentDateChange={ handleDateChange }
        />

        <EditingState
          onCommitChanges={onCommitChanges}
          addedAppointment={addedAppointment}
          onAddedAppointmentChange={onAddedAppointmentChange}
        />

        <IntegratedEditing />
        <DayView
          startDayHour={9}
          endDayHour={19}
          timeTableCellComponent={ TimeTableCell }
        />
        <WeekView
          startDayHour={9}
          endDayHour={19}
          timeTableCellComponent={ TimeTableCell }
        />
        <MonthView />

        <Appointments />
        <Resources
          data={ instructors }
        />
        <Toolbar />
        <ViewSwitcher
          onSwitch={(view) => setCurrentView(view)}
          currentViewName={currentView}
        />
        <EditRecurrenceMenu />
        <DragDropProvider allowDrag={allowDrag} allowResize={allowResize} />

        <DateNavigator />
        <TodayButton />

        {/* convert me to filters and header
        <EditingOptionsSelector
          options={editingOptions}
          onOptionsChange={handleEditingOptionsChange}
        />*/}

        {/*<CustomAppointmentTooltip />*/}

    {/*<AppointmentTooltip 
          showOpenButton 
          showDeleteButton={editingOptions.allowDeleting} 
        />*/}

          <AppointmentTooltip
            headerComponent={Header}
            contentComponent={Content}
            commandButtonComponent={CommandButton}
            showCloseButton
            showOpenButton 
            showDeleteButton={editingOptions.allowDeleting} 
          />

        <AppointmentForm
          commandButtonComponent={ CommandButton } 
          readOnly={isAppointmentBeingCreated ? false : !editingOptions.allowUpdating}
        />

        {/*<CustomAppointmentForm
          commandButtonComponent={ CommandButton } 
          readOnly={ isAppointmentBeingCreated ? false : !editingOptions.allowUpdating }
        />*/}

      </Scheduler>
    </Paper>
  );
};

