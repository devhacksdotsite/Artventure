/*
* @\hooks\useFilter.js
* Name: useFilter
* Author: Jesse Salinas
* Date: 08/19/2023
*/

import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Context
import { GlobalCtx } from '@/context/GlobalState';

const isEqual = (obj1, obj2) => {

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {

      if (!isEqual(obj1[key], obj2[key])) {

        return false;
      }
    } else if (obj1[key] !== obj2[key]) {

      return false;
    }
  }

  return true;
};

export const useFilter = () => {

  const { filter, setFilter } = useContext(GlobalCtx);

  const defaultFilter = {
    search: '',
    status: 'active'
  }

  const resetFilter = () => {
    setFilter(defaultFilter);
  }

  const activeFilter = () => {

    return !isEqual(filter, defaultFilter);    
  }

  useEffect(() => {

    // Return a cleanup function on unmount
    return () => {

      resetFilter();
    };
  }, []);

  return {
    filter,
    setFilter,
    resetFilter,
    activeFilter,
  };
};


