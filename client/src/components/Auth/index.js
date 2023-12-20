/*
  * components\Auth\index.js
  * Author: Jesse Salinas
  * Date: 07/25/2023
*/

import { Navigate } from 'react-router-dom';

// Hooks
import { useAuth } from '@/hooks/useAuth';

export const RequireAuth = ({ children }) => {

  const { authenticated, loading } = useAuth();

  if (loading) {

    // TODO: Add custom loader.
    return <div>Loading...</div>;
  }

  // TODO: Fix me, I need to redirct to either student or admin depending on the portal I am in...
  return authenticated === true ? children : <Navigate to="/admin" replace />
}


