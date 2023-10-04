/*
  * routes\Admin\Calendar.js
  * Author: Jesse Salinas
  * Date: 07/28/2023
*/

import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
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
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from '../../data/demo/appointments';

export const Calendar = () => {
  const [data, setData] = useState(appointments);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('Month');

  console.log(data);

  const handleDateChange = (date) => {
    setCurrentDate(date);
  }

  // fix me
  const handleViewChange = (view) => {
    console.log(view);
    setCurrentView(view);
  }

  const commitChanges = ({ added, changed, deleted }) => {
    setData(prevData => {
      let newData = [...prevData];
      if (added) {
        const startingAddedId = prevData.length > 0 ? prevData[prevData.length - 1].id + 1 : 0;
        newData = [...prevData, { id: startingAddedId, ...added }];
      }
      if (changed) {
        newData = newData.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        newData = newData.filter(appointment => appointment.id !== deleted);
      }
      return newData;
    });
  }

  return (
    <Paper>
      <Scheduler data={data}>
        <ViewState 
          currentDate={currentDate}
          onCurrentDateChange={ handleDateChange }
        />
        <EditingState onCommitChanges={commitChanges} />
        <DayView  
          startDayHour={9}
          endDayHour={15}
        />
        <WeekView 
          startDayHour={9} 
          endDayHour={15} 
        />
        <MonthView />

        <Appointments />

        <Toolbar />
        <ViewSwitcher 
          onSwitch={ handleViewChange }
        />
        <EditRecurrenceMenu />
        <DragDropProvider />
        <DateNavigator />
        <TodayButton />
      </Scheduler>
    </Paper>
  );
}




