/*
  * context\AppReducer.js
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

	case 'SET_AUTHENTICATED':
	  return {
		...state,
		authenticated: action.payload,
	  }

	default: 
	  return state;
  }
}


