/*
* @\hooks\useNavLinks.js
* Name: useNavLinks
* Author: Jesse Salinas
* Date: 07/29/2023
*/

import { useContext, useEffect, useState } from 'react';

// Context
import { GlobalCtx } from '@/context/GlobalState';

// Data
import { mainListItems as studentMainListItems, secondaryListItems as studentSecondaryListItems } from '@/data/student/navData';

import { 
  mainListItems as adminMainListItems, 
  secondaryListItems as adminSecondaryListItems,
  accountMenuMainListItems as adminAccountMenuMainListItems,
  accountMenuSecondaryListItems as adminAccountMenuSecondaryListItems
} from '@/data/admin/navData';

export const useNavLinks= () => {

  // CTX
  const { 
    portal, 
    setPortal 
  } = useContext(GlobalCtx);

  // State
  const [ navigationItems, setNavigationItems ] = useState({});

  // Hooks
  useEffect(() => {

    let mainListItems, 
      secondaryListItems, 
      mainAccountMenuListItems, 
      secondaryAccountMenuListItems;

    if (portal === 'student') {

      // Set Navigation Items
      mainListItems = studentMainListItems;
      secondaryListItems = studentSecondaryListItems;

    } else if (portal === 'admin') {

      // Set Navigation Items
      mainListItems = adminMainListItems;
      secondaryListItems = adminSecondaryListItems;

      // Set Account Menu Items
      mainAccountMenuListItems = adminAccountMenuMainListItems;
      secondaryAccountMenuListItems = adminAccountMenuSecondaryListItems;
    } else {

      // Set Navigation Items
      mainListitems = [];
      secondaryListitems = [];

      // Set Account Menu Items
      mainAccountMenuListitems = [];
      secondaryAccountMenuListitems = [];
    }

    // Set Navigation Items State
    setNavigationItems({ 
      mainListItems, 
      secondaryListItems,
      mainAccountMenuListItems,
      secondaryAccountMenuListItems
    });

  }, [ portal ]);

  return navigationItems;
}

