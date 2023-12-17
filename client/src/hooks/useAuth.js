/*
  * hooks\useAuth.js
  * Author: Jesse Salinas
  * Date: 07/22/2023
*/

import { useState, useContext, useEffect } from 'react';

// CTX
import { GlobalCtx } from '@/context/GlobalState';

// Utils
import { getData, postData, putData, deleteData } from '@/utils/fetchData';

export const useAuth = () => {

  // State
  const [ loading, setLoading ] = useState(true);

  // CTX
  const { 
    authenticated, 
    setAuthenticated, 
    portal, 
    setPortal, 
    token, 
    setToken 
  } = useContext(GlobalCtx);

  // Hooks
  useEffect(() => {
   
    const tokenAuth = () => {

      const token = localStorage.getItem('token');

      if (token) {

        setToken(token);
        setAuthenticated(true);
      } else {

        setToken(null);
        setAuthenticated(false);
      }

      setLoading(false);
    }

    tokenAuth();

  }, []); // OnMount

  const login = async ({ email, password }) => {

    try {
      const url = `http://localhost:3050/api/auth/signin`; 
      const payload = { email, password };

      const response = await postData(url, payload);

      const { token, user_id } = response.user;

      // Set token CTX
      setToken(token);

      // Store token in local storage
      localStorage.setItem('token', token);

      // Set authenticated CTX
      setAuthenticated(true);

      return user_id;

    } catch (error) {

      // Set authenticated CTX
      setAuthenticated(false);

      console.error("Login error:", error);
    }
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
	logout,
    loading
  }
}

