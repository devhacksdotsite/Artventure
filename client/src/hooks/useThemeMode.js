/*
  * hooks\useThemeMode.js
  * Author: Jesse Salinas
  * Date: 07/20/2023
*/

import { useContext, useEffect } from 'react';

// Context
import { GlobalCtx } from '../context/GlobalState';

// MUI
import useMediaQuery from '@mui/material/useMediaQuery';

export const useThemeMode = () => {
  const { darkMode, setDarkMode } = useContext(GlobalCtx);

  // check whether the client's system has enabled dark theme
  // if enabled then, use dark theme by default
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");   
  useEffect(() => {
    console.log('usethem!!');
    if (localStorage.getItem('theme') === "dark") {
      // if user has opted for dark theme
      // then set the value of darkMode as true
      setDarkMode(true);
    } else if (localStorage.getItem('theme') === "light") {
      // if user has opted for light theme
      // then set the value of darkMode as false
      setDarkMode(false);
    } else {
      // if there is nothing in the local storage
      // then, use the system theme by default
      setDarkMode(prefersDarkMode);
    }
  }, [ prefersDarkMode ]);

  // handlers 
  const handleDarkMode = () => {
    if (darkMode) {
      localStorage.setItem('theme', "light");
      setDarkMode(false);
    } else {
      localStorage.setItem('theme', "dark");
      setDarkMode(true);
    }
  };

  return {
	darkMode,
	handleDarkMode,
  }
}


