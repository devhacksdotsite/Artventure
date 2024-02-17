/*
* @\hooks\useGreeting.js
* Name: useGreeting
* Author: Jesse Salinas
* Date: 02/16/2024
*/

import React, { useState, useEffect, useContext } from 'react';

// CTX
import { GlobalCtx } from '@/context/GlobalState';


const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {

    return 'Good Morning';
  } else if (hour >= 12 && hour < 17) {

    return 'Good Afternoon';
  } else if (hour >= 17 && hour < 20) {

    return 'Good Evening';
  } else {

    return 'Good Night';
  }
}

export const useGreeting = () => {

  const [ timeOfDay, setTimeOfDay ] = useState(getTimeOfDay());

  // CTX
  const { user } = useContext(GlobalCtx);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []); 

  return { 
    timeOfDay,
    user
  }
}

