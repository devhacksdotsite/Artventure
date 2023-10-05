/*
  * data\demo\appointments.js
  * Author: Jesse Salinas
  * Date: 10/03/2023
*/

const generateAppointments = () => {
  const today = new Date();
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  const appointments = [
    {
      title: 'Last Month Appointment 1',
      startDate: new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 10, 9, 0),
      endDate: new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 10, 10, 0),
      id: 3,
    },
    {
      title: 'Last Month Appointment 2',
      startDate: new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 15, 14, 0),
      endDate: new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 15, 15, 0),
      id: 4,
    },
    {
      title: 'This Month Appointment 1',
      startDate: new Date(today.getFullYear(), today.getMonth(), 5, 10, 30),
      endDate: new Date(today.getFullYear(), today.getMonth(), 5, 11, 30),
      id: 5,
    },
    {
      title: 'This Month Appointment 2',
      startDate: new Date(today.getFullYear(), today.getMonth(), 10, 13, 0),
      endDate: new Date(today.getFullYear(), today.getMonth(), 10, 14, 0),
      id: 6,
    },
    {
      title: 'Next Month Appointment 1',
      startDate: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 8, 10, 0),
      endDate: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 8, 11, 0),
      id: 7,
    },
    {
      title: 'Next Month Appointment 2',
      startDate: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 20, 14, 0),
      endDate: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 20, 15, 0),
      id: 8,
    },
  ];

  return appointments;
};

export const appointments = generateAppointments();

