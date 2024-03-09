/*
  * data\admin\modalData.js
  * Name: modalData
  * Author: Jesse Salinas
  * Date: 08/18/2023
*/

// Components
import { InstructorForm } from '@/components/Forms/Instructor/';
import { Tag as InstructorTag } from '@/components/Cards/Instructor/Tag';
import { DeleteEntry as InstructorDelete } from '@/components/Forms/DeleteEntry';
import { FilterOptionForm } from '@/components/Forms/Instructor/FilterOption';

import { ClientForm } from '@/components/Forms/Client/';
import { ClientDelete } from '@/components/Forms/Client/Delete';
import { ClientReactivate } from '@/components/Forms/Client/Reactivate';
import { FilterForm as FilterClientForm } from '@/components/Forms/Client/Filter';
import { Tag as ClientTag } from '@/components/Cards/Client/Tag';

import { StudentForm } from '@/components/Forms/Student/';
import { Tag as StudentTag } from '@/components/Cards/Student/Tag';
import { FilterOptionForm as FilterStudentForm } from '@/components/Forms/Client/FilterOption';

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
    filter: {
      component: FilterOptionForm, 
      title: 'Filter Instructors',
      subtitle: 'Complete the form to filter instructors.',
    },
    tag: {
      component: InstructorTag, 
      title: 'Instructor Details',
      subtitle: 'Additional instructor details',
    }
  },

  clients: {
    add: {
      component: ClientForm,
      title: 'Add Client',
      subtitle: 'Complete the form to add a new client.',
    },
    edit: {
      component: ClientForm,
      title: 'Edit Client',
      subtitle: 'Complete the form to edit the client details.',
    },
    delete: {
      component: ClientDelete, 
      title: 'Delete Client',
      subtitle: null,
    },
    reactivate: {
      component: ClientReactivate, 
      title: 'Reactivate Client',
      subtitle: null,
    },
    filter: {
      component: FilterClientForm, 
      title: 'Filter Clients',
      subtitle: 'Complete the form to filter clients.',
    },
    tag: {
      component: ClientTag, 
      title: 'Client Details',
      subtitle: 'Additional client details',
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
      component: InstructorDelete, 
      title: 'Delete Instructor',
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


