/*
  * hooks\useAuth.js
  * Author: Jesse Salinas
  * Date: 07/22/2023
*/

import { useState, useContext, useEffect } from 'react';

// CTX
import { GlobalCtx } from '@/context/GlobalState';

// Hooks
import { useFetch } from '@/hooks/useFetch'; //change me to a utility

export const useAuth = () => {

  // State
  const [loading, setLoading] = useState(true);

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
  const { useGetData, usePostData, usePutData, useDeleteData } = useFetch();

  // Check for token in localStorage during initialization
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {

      setToken(token);
      setAuthenticated(true);
    } else {

      setToken(null);
      setAuthenticated(false);
    }

    setLoading(false);
  }, []);

  const login = async ({ email, password }) => {
    try {
      const url = `http://localhost:3050/api/auth/signin`; 
      const payload = { email, password };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(payload) 
      });

      if (!response.ok) {
        setAuthenticated(false);
        //throw new Error('Network response was not ok');
        alert('Invalid user');
        return;
      } 

      // Parse the response as JSON
      const responseData = await response.json();     

      // store JWT Token
      const { token } = responseData.user;
      setToken(token);
      localStorage.setItem('token', token);

      // setAuthenticated
      setAuthenticated(true);

      return responseData.user.user_id;

    } catch (error) {

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

