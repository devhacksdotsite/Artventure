/*
  * components\Auth\index.js
  * Author: Jesse Salinas
  * Date: 07/25/2023
*/

// Hooks
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const RequireAuth = ({ children }) => {
  const { authenticated } = useAuth();

  return authenticated === true ? children : <Navigate to="/" replace />
}


