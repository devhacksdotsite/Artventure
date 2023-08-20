/*
  * hooks\useSlug.js
  * Author: Jesse Salinas
  * Date: 08/19/2023
*/

import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const determineSlug = (pathname) => {

  const slugMap = {
    'instructors': 'instructor',
    'students': 'student',
    'patrons': 'patron'
  };

  const name = Object.keys(slugMap).find((key) => pathname.includes(key));
  const singularName = name.endsWith('s') ? name.slice(0, -1) : name;

  return {
    name,
    singularName
  };
};

// Context
import { GlobalCtx } from '../context/GlobalState';

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


