/*
  * context\GlobalState.js
  * Author: Jesse Salinas
  * Date: 07/22/2023
*/

import { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Set application's initial state
const initialState = {
  portal: 'student',
  authenticated: false
}

// Create application Context
export const GlobalCtx = createContext(initialState);

// Provider Components
export const GlobalProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(AppReducer, initialState);

  // Actions
  const setPortal = (portal) => {
	dispatch({
	  type: 'SET_PORTAL',
	  payload: portal
	});
  }

  const setAuthenticated = (authenticated) => {
	dispatch({
	  type: 'SET_AUTHENTICATED',
	  payload: authenticated
	});
  }

  return (
	<GlobalCtx.Provider value={{
	  portal: state.portal,
	  authenticated: state.authenticated,
	  setAuthenticated,
	  setPortal,
	}}>
	  { children }
	</GlobalCtx.Provider>
  );
}



