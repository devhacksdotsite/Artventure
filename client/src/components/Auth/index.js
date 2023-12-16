/*
  * components\Auth\index.js
  * Author: Jesse Salinas
  * Date: 07/25/2023
*/

import { Navigate } from 'react-router-dom';

// Hooks
import { useAuth } from '@/hooks/useAuth';

export const RequireAuth = ({ children }) => {
  const { authenticated } = useAuth();

  return authenticated === true ? children : <Navigate to="/" replace />
}


