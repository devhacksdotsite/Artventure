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
} from '@devexpress/dx-react-scheduler-material-ui';

import { EditingOptionsSelector, classes } from '../../components/Calendar/EditingOptionsSelector'; 
import { appointments } from '../../data/demo/appointments';

export const Calendar = () => {
  const [data, setData] = useState(appointments);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('Month');
  const [editingOptions, setEditingOptions] = useState({
    allowAdding: true,
    allowDeleting: true,
    allowUpdating: true,
    allowDragging: true,
    allowResizing: true,
  });
  const [addedAppointment, setAddedAppointment] = useState({});
  const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] = useState(false);

  const onCommitChanges = useCallback(
    ({ added, changed, deleted }) => {
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
    [setData, setIsAppointmentBeingCreated, data]
  );

  const onAddedAppointmentChange = useCallback(
    (appointment) => {
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
    [editingOptions]
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
    [editingOptions.allowAdding]
  );

  const CommandButton = useCallback(
    ({ id, ...restProps }) => {
      if (id === 'deleteButton') {
        return (
          <AppointmentForm.CommandButton
            id={id}
            {...restProps}
            disabled={!editingOptions.allowDeleting}
          />
        );
      }
      return <AppointmentForm.CommandButton id={id} {...restProps} />;
    },
    [editingOptions.allowDeleting]
  );

  const allowDrag = useCallback(
    () => editingOptions.allowDragging && editingOptions.allowUpdating,
    [editingOptions.allowDragging, editingOptions.allowUpdating]
  );

  const allowResize = useCallback(
    () => editingOptions.allowResizing && editingOptions.allowUpdating,
    [editingOptions.allowResizing, editingOptions.allowUpdating]
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
      <Scheduler data={data} height={600}>
        <ViewState 
          currentDate={currentDate} 
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
          timeTableCellComponent={TimeTableCell}
        />
        <WeekView
          startDayHour={9}
          endDayHour={19}
          timeTableCellComponent={TimeTableCell}
        />
        <MonthView />
        <Appointments />
        <Toolbar />
        <ViewSwitcher
          onSwitch={(view) => setCurrentView(view)}
          currentViewName={currentView}
        />
        <EditRecurrenceMenu />
        <DragDropProvider allowDrag={allowDrag} allowResize={allowResize} />
        <DateNavigator />
        <TodayButton />
        <EditingOptionsSelector
          options={editingOptions}
          onOptionsChange={handleEditingOptionsChange}
        />
        <AppointmentTooltip showOpenButton showDeleteButton={editingOptions.allowDeleting} />
        <AppointmentForm
          commandButtonComponent={CommandButton}
          readOnly={isAppointmentBeingCreated ? false : !editingOptions.allowUpdating}
        />
      </Scheduler>
    </Paper>
  );
};

