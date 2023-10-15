/*
  * routes\Admin\Calendar.js
  * Author: Jesse Salinas
  * Date: 07/28/2023
*/

import React, { useState, useCallback } from 'react';

// Components
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

import classNames from 'clsx';

// MUI
import Paper from '@mui/material/Paper';

// Custom components
import { CustomTooltipHeader } from '../../components/Calendar/Tooltip/Header'; 
import { CustomTooltipContent } from '../../components/Calendar/Tooltip/Content'; 

// fix me below
import { CustomAppointmentForm } from '../../components/Calendar/CustomAppointmentForm'; 
import { EditingOptionsSelector, classes } from '../../components/Calendar/EditingOptionsSelector'; 

// Dummy data
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

const CommandButton = (({
  ...restProps
}) => (
  <StyledAppointmentTooltipCommandButton 
    { ...restProps } 
    className={ classes2.commandButton } 
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

        <AppointmentTooltip
          headerComponent={ CustomTooltipHeader }
          contentComponent={ CustomTooltipContent } 
          commandButtonComponent={ CommandButton }
          showCloseButton
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

