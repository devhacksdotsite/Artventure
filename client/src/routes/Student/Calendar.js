/*
  * routes\Admin\Calendar.js
  * Author: Jesse Salinas
  * Date: 07/28/2023
*/

import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  MonthView,
  Appointments,
  AppointmentTooltip,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

const currentDate = '2018-11-01';
const schedulerData = [
  { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
  { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
];

export const Calendar = () => {

  return (
    <Paper>
      <Scheduler
        data={schedulerData}
      >
        <ViewState
          currentDate={currentDate}
        />
        <MonthView
          startDayHour={9}
          endDayHour={14}
        />

        <Toolbar />

        <DateNavigator />
        <TodayButton />

        <ViewSwitcher />

        <Appointments />
        <AppointmentTooltip />
      </Scheduler>
    </Paper>
  );
}


