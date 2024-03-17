/*
* @\hooks\useAuth.js
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
    user,
    setUser,
    token, 
    setToken 
  } = useContext(GlobalCtx);

  // Navigate
  const navigate = useNavigate();

  // Hooks
  useEffect(() => {
   
    const tokenAuth = () => {

      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (user) {

        setUser(JSON.parse(user));
      } else {

        setUser({});
      }

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

    // Clear the user information from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Clear CTX
    setUser({});
    setToken(null);
    setAuthenticated(false);

    // Redirect to login page
    // TODO: Fix me, I need to redirct to either student or admin depending on the portal I am in...
    navigate('/admin');

    return true;
  }

  const login = async ({ email, password }) => {

    try {
      const url = `/api/auth/signin`; 
      const payload = { email, password };

      const response = await postData(url, payload);

      console.log(response.user);
      const { token, user_id, username, fullname } = response.user;

      // Set CTX
      setToken(token);
      setUser({
        user_id,
        username,
        fullname,
      });

      // Store token in local storage
      localStorage.setItem('token', token);

      // This is a security risk update to pull on every request.
      localStorage.setItem('user', JSON.stringify({ user_id, username, fullname }));

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

