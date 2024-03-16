/*
* @\context\GlobalState.js
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
  user: {
    id: '',
    fullname: '',
  },
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

  instructors: [],
  clients: [],
  students: [],

  view: 'table',
  filter: {
    search: '',
    status: 'active',
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

  const setUser = (user) => {
    dispatch({
      type: 'SET_USER',
      payload: user
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

  const setInstructors = (instructors) => {
    dispatch({
      type: 'SET_INSTRUCTORS',
      payload: instructors
    });
  } 

  const setStudents = (students) => {
    dispatch({
      type: 'SET_STUDENTS',
      payload: students
    });
  } 

  const setClients = (clients) => {
    dispatch({
      type: 'SET_CLIENTS',
      payload: clients
    });
  } 

  // Filters
  const setFilter = (filter) => {
  
    dispatch({
      type: 'SET_FILTER',
      payload: filter
    });
  }

  const setView = (view) => {
  
    dispatch({
      type: 'SET_VIEW',
      payload: view
    });
  }

  return (
	<GlobalCtx.Provider value={{
	  portal: state.portal,
	  user: state.user,
      token: state.token,
	  authenticated: state.authenticated,
	  darkMode: state.darkMode,
      slug: state.slug,
      school: state.school,
      instructors: state.instructors,
      clients: state.clients,
      students: state.students,
      filter: state.filter,
      view: state.view,

      setUser,
      setToken,
	  setAuthenticated,
	  setPortal,
	  setDarkMode,
      setSlug,
      setInstructors,
      setClients,
      setStudents,
      setFilter,
      setView,
	}}>
	  { children }
	</GlobalCtx.Provider>
  );
}

