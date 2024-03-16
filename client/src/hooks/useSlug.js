/*
* @\hooks\useSlug.js
* Name: useSlug
* Author: Jesse Salinas
* Date: 08/19/2023
*/

import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Context
import { GlobalCtx } from '@/context/GlobalState';

// Helpers
const determineSlug = (pathname) => {

  const slugMap = {
    'instructors': 'instructor',
    'students': 'student',
    'patrons': 'patron',
    'attendance': 'attendance',
    'roster': 'roster',
  };

  const name = Object.keys(slugMap).find((key) => pathname.includes(key));
  const singularName = name.endsWith('s') ? name.slice(0, -1) : name;

  return {
    name,
    singularName
  };
};

export const useSlug = () => {
  const { slug, setSlug } = useContext(GlobalCtx);

  const location = useLocation();

  useEffect(() => {

    // Set the slug ctx
    setSlug({
      ...determineSlug(location.pathname)
    });

  }, [ location.pathname ]);

  return { slug }
}


