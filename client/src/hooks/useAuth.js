/*
  * hooks\useAuth.js
  * Author: Jesse Salinas
  * Date: 07/22/2023
*/

import { useContext, useEffect } from 'react';

// Context
import { GlobalCtx } from '../context/GlobalState';

export const useAuth = () => {
  const { authenticated, setAuthenticated, portal, setPortal } = useContext(GlobalCtx);

  const login = () => {

	return new Promise((res) => {
	  setAuthenticated(true);
      res();
    });
  }

  const logout = () => {

	return new Promise((res) => {
	  setAuthenticated(false);
      res();
    });
  }

  return {
	authenticated,
	login,
	logout
  }
}

