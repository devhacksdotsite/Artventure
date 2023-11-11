/*
  * data\admin\modalData.js
  * Author: Jesse Salinas
  * Date: 08/18/2023
*/

// Components
import { AddInstructorForm } from '../../components/Forms/Instructor/AddInstructor';
import { FilterOptionForm } from '../../components/Forms/Instructor/FilterOption';

import { AddStudentAttendanceForm } from '../../components/Forms/Attendance/AddStudent';
import { ManageAttendanceForm } from '../../components/Forms/Attendance/ManageAttendance';

export const modalData = {
  instructors: {
    add: {
      component: AddInstructorForm,
      title: 'Add Instructor',
      subtitle: 'Complete the form to add a new instructor.',
    },
    filter: {
      component: FilterOptionForm, 
      title: 'Filter Instructors',
      subtitle: 'Complete the form to filter instructors.',
    }
  },
  students: {

  },
  patrons: {

  },
  attendance: {
    add: {
      component: AddStudentAttendanceForm,
      title: 'Add Student',
      subtitle: 'Add student to the attendance for this appointment',
    },
    manage: {
      component: ManageAttendanceForm, 
      title: 'Attendance',
      subtitle: 'Manage attendance',
      fullScreen: true,
    }
  },
}


