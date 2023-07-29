/*
  * hooks\useNavLinks.js
  * Author: Jesse Salinas
  * Date: 07/29/2023
*/

import { useContext, useEffect, useState } from 'react';

// Context
import { GlobalCtx } from '../context/GlobalState';

// Data
import { mainListItems as studentMainListItems, secondaryListItems as studentSecondaryListItems } from '../data/student/navData';
import { mainListItems as adminMainListItems, secondaryListItems as adminSecondaryListItems } from '../data/admin/navData';

export const useNavLinks= () => {
  const { portal, setPortal } = useContext(GlobalCtx);

  const [navigationItems, setNavigationItems] = useState({});

  useEffect(() => {

    let mainListItems, secondaryListItems;
    if (portal === 'student') {

      mainListItems = studentMainListItems;
      secondaryListItems = studentSecondaryListItems;
    } else if (portal === 'admin') {

      mainListItems = adminMainListItems;
      secondaryListItems = adminSecondaryListItems;
    } else {

      mainListitems = [];
      secondaryListitems = [];
    }

    setNavigationItems({ mainListItems, secondaryListItems });
  }, [ portal ]);

  return navigationItems;
}

