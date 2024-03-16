/*
* @\data\admin\modalData.js
* Name: modalData
* Author: Jesse Salinas
* Date: 08/18/2023
*/

/***********************************
              Instructors
/***********************************/

import { InstructorForm } from '@/components/Forms/Instructor/';

import { InstructorDelete } from '@/components/Forms/Instructor/Delete';

import { InstructorReactivate } from '@/components/Forms/Instructor/Reactivate';

import { FilterForm as FilterInstructorForm } from '@/components/Forms/Instructor/Filter';

import { Tag as InstructorTag } from '@/components/Cards/Instructor/Tag';

/***********************************
              Patrons
/***********************************/

import { ClientForm } from '@/components/Forms/Client/';

import { ClientDelete } from '@/components/Forms/Client/Delete';

import { ClientReactivate } from '@/components/Forms/Client/Reactivate';

import { FilterForm as FilterClientForm } from '@/components/Forms/Client/Filter';

import { Tag as ClientTag } from '@/components/Cards/Client/Tag';

/***********************************
               Students
/***********************************/

import { StudentForm } from '@/components/Forms/Student/';

import { StudentDelete } from '@/components/Forms/Student/Delete';

import { StudentReactivate } from '@/components/Forms/Student/Reactivate';

import { FilterForm as FilterStudentForm } from '@/components/Forms/Student/Filter';

import { Tag as StudentTag } from '@/components/Cards/Student/Tag';


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
      component: InstructorForm,
      title: 'Edit Instructor',
      subtitle: 'Complete the form to edit the instructor details.',
    },
    delete: {
      component: InstructorDelete, 
      title: 'Delete Instructor',
      subtitle: null,
    },
    reactivate: {
      component: InstructorReactivate, 
      title: 'Reactivate Instructor',
      subtitle: null,
    },
    filter: {
      component: FilterInstructorForm, 
      title: 'Filter Instructors',
      subtitle: 'Complete the form to filter instructors.',
    },
    tag: {
      component: InstructorTag, 
      title: 'Instructor Details',
      subtitle: 'Additional instructor details',
    }
  },

  patrons: {
    add: {
      component: ClientForm,
      title: 'Add Patron',
      subtitle: 'Complete the form to add a new Patron.',
    },
    edit: {
      component: ClientForm,
      title: 'Edit Patron',
      subtitle: 'Complete the form to edit the patron&apos;s details.',
    },
    delete: {
      component: ClientDelete, 
      title: 'Delete Patron',
      subtitle: null,
    },
    reactivate: {
      component: ClientReactivate, 
      title: 'Reactivate Patron',
      subtitle: null,
    },
    filter: {
      component: FilterClientForm, 
      title: 'Filter Patrons',
      subtitle: 'Complete the form to filter patrons.',
    },
    tag: {
      component: ClientTag, 
      title: 'Patron Details',
      subtitle: 'Additional patron details',
    }
  },

  students: {
    add: {
      component: StudentForm,
      title: 'Add Student',
      subtitle: 'Complete the form to add a new student.',
    },
    edit: {
      component: StudentForm,
      title: 'Edit Student',
      subtitle: 'Complete the form to edit the student details.',
    },
    delete: {
      component: StudentDelete, 
      title: 'Delete Student',
      subtitle: null,
    },
    reactivate: {
      component: StudentReactivate, 
      title: 'Reactivate Student',
      subtitle: null,
    },
    filter: {
      component: FilterStudentForm, 
      title: 'Filter Students',
      subtitle: 'Complete the form to filter students.',
    },
    tag: {
      component: StudentTag, 
      title: 'Student Details',
      subtitle: 'Additional student details',
    }
  },

  attendance: {
    add: {
      component: AddStudentAttendanceForm,
      title: 'Add Student',
      subtitle: 'Add student to the attendance for this appointment',
    },
    filter: {
      component: FilterStudentForm, 
      title: 'Filter Students',
      subtitle: 'Complete the form to filter students.',
    },
    manage: {
      component: ManageAttendanceForm, 
      title: 'Attendance',
      subtitle: 'Manage attendance',
      fullScreen: true,
    }
  },
}


