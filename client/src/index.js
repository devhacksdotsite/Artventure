/*
  * index.js
  * Author: Jesse Salinas
  * Date: 07/20/2023
*/

import { useMemo } from 'react';
import { createRoot } from 'react-dom/client';

// hooks
import { useThemeMode } from './hooks/useThemeMode';

// Context
import { GlobalProvider } from './context/GlobalState';

// MUI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// themes
import { themeL, themeD } from "./themes/";

// components
import App from './App';

const Root = () => {
  const { darkMode } = useThemeMode();

  // set theme
  let theme = useMemo(() => {
    return createTheme(darkMode ? themeD : themeL);
  }, [ darkMode ]);

  return (
    <ThemeProvider theme={ theme }>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <GlobalProvider>
	<Root />
  </GlobalProvider>
);

