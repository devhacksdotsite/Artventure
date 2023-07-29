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
  authenticated: false,
  darkMode: false,
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

  const setDarkMode = (darkMode) => {
	dispatch({
	  type: 'SET_DARK_MODE',
	  payload: darkMode
	});
  }

  return (
	<GlobalCtx.Provider value={{
	  portal: state.portal,
	  authenticated: state.authenticated,
	  darkMode: state.darkMode,
	  setAuthenticated,
	  setPortal,
	  setDarkMode,
	}}>
	  { children }
	</GlobalCtx.Provider>
  );
}



