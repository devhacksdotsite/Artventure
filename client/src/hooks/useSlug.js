/*
  * hooks\useSlug.js
  * Author: Jesse Salinas
  * Date: 08/19/2023
*/

import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const determineSlug = (pathname) => {
  let slug = '';
  let singularName = '';
  
  // Extract slug from routes
  if (pathname.includes('/instructors')) {
    slug = 'instructors';
    singularName = 'instructor';
  } else if (pathname.includes('/students')) {
    slug = 'students';
    singularName = 'student';
  } else if (pathname.includes('/patrons')) {
    slug = 'patrons';
    singularName = 'patron';
  }

  return {
    slug,
    singularName
  }
};

// Context
import { GlobalCtx } from '../context/GlobalState';

export const useSlug = () => {
  const { slug, setSlug } = useContext(GlobalCtx);

  const location = useLocation();
  const slugInfo = determineSlug(location.pathname);

  useEffect(() => {
    console.log('Executing slug effect for pathname:', location.pathname);

    // Set the slug ctx
    setSlug(slugInfo.slug);

  }, [ location.pathname ]);

  console.log('Returning slug:', slug);

  return {
    slug
  }

}


