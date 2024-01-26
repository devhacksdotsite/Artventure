/*
  * hooks\useAuth.js
  * Author: Jesse Salinas
  * Date: 07/22/2023
*/

import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

  // Navigate
  const navigate = useNavigate();

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

  const logout = () => {
     
    // TODO: We will need to blacklist the token, POST request here...

    // Clear the token from localStorage
    localStorage.removeItem('token');

    // Clear the token and setAuthenticated in the CTX
    setToken(null);
    setAuthenticated(false);
  
    // Redirect to login page
    // TODO: Fix me, I need to redirct to either student or admin depending on the portal I am in...
    navigate('/admin');

    return true;
  }

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

  return {
	authenticated,
    token,
	login,
	logout,
    loading
  }
}

