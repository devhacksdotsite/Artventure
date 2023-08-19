/*
  * data\admin\modalData.js
  * Author: Jesse Salinas
  * Date: 08/18/2023
*/

// Components
import { AddInstructorForm } from '../../components/Forms/Instructor/AddInstructor';
import { FilterOptionForm } from '../../components/Forms/Instructor/FilterOption';

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

  }
}


