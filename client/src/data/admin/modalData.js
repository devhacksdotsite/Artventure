/*
  * data\admin\modalData.js
  * Author: Jesse Salinas
  * Date: 08/18/2023
*/

// Components
import { InstructorForm } from '@/components/Forms/Instructor/';
import { FilterOptionForm } from '@/components/Forms/Instructor/FilterOption';

import { AddStudentAttendanceForm } from '@/components/Forms/Attendance/AddStudent';
import { ManageAttendanceForm } from '@/components/Forms/Attendance/ManageAttendance';

export const modalData = {
  instructors: {
    add: {
      component: InstructorForm,
      title: 'Add Instructor',
      subtitle: 'Complete the form to add a new instructor.',
    },
    edit: {
      component: InstructorForm, // change to InstructorForm
      title: 'Edit Instructor',
      subtitle: 'Complete the form to edit the instructor details.',
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


