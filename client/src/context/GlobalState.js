/*
  * context\GlobalState.js
  * Author: Jesse Salinas
  * Date: 07/22/2023
*/

import { createContext, useReducer } from 'react';

// CTX
import AppReducer from '@/context/AppReducer';

// Set application's initial state
const initialState = {
  //portal: 'student',
  portal: 'admin',
  token: null,
  authenticated: false,
  darkMode: false,
  slug: {
    name: '',
    singularName: '',
  },
  school: {
    name: 'ArtventureOC',
    code: 'AOC'
  },
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

  const setToken = (token) => {
    dispatch({
      type: 'SET_TOKEN',
      payload: token
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

  const setSlug = (slug) => {
    dispatch({
      type: 'SET_SLUG',
      payload: slug
    });
  }

  return (
	<GlobalCtx.Provider value={{
	  portal: state.portal,
      token: state.token,
	  authenticated: state.authenticated,
	  darkMode: state.darkMode,
      slug: state.slug,
      school: state.school,
      setToken,
	  setAuthenticated,
	  setPortal,
	  setDarkMode,
      setSlug,
	}}>
	  { children }
	</GlobalCtx.Provider>
  );
}



