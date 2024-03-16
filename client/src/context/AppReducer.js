/*
* @\context\AppReducer.js
* Name: AppReducer
* Author: Jesse Salinas
* Date: 07/22/2023
*/

export default (state, action) => {
  switch (action.type) {
	case 'SET_PORTAL':
	  return {
		...state,
		portal: action.payload,
	  }

    case 'SET_SCHOOL':
      return {
        ...state,
        school: action.payload,
      }

	case 'SET_USER':
	  return {
		...state,
	    user: action.payload,
	  }

	case 'SET_TOKEN':
	  return {
		...state,
		token: action.payload,
	  }

	case 'SET_AUTHENTICATED':
	  return {
		...state,
		authenticated: action.payload,
	  }

	case 'SET_DARK_MODE':
	  return {
		...state,
		darkMode: action.payload,
	  }

    case 'SET_SLUG':
      return {
        ...state,
        slug: action.payload,
      }

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      }

    case 'SET_VIEW':
      return {
        ...state,
        view: action.payload
      }

    case 'SET_INSTRUCTORS':
      return {
        ...state,
        instructors: action.payload,
      }

    case 'SET_PATRONS':
      return {
        ...state,
        patrons: action.payload,
      }

    case 'SET_STUDENTS':
      return {
        ...state,
        students: action.payload,
      }

	default: 
	  return state;
  }
}


