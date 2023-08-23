 /*
  * routes\Admin\Instructors.js
  * Author: Jesse Salinas
  * Date: 08/06/2023
*/

import { useState } from 'react';

// MUI
import {

} from '@mui/material';

// Components
import { DataVisualization } from '../../components/DataVisualization/';

// Hooks
import { useSlug } from '../../hooks/useSlug';
import { useFetch } from '../../hooks/useFetch';

const d = async () => {}

export const Instructors = () => {
  const { slug } = useSlug();
  const { useGetData, usePostData, usePutData, useDeleteData } = useFetch();

  // Call the useGetData function outside the render function
  const placeholderData = useGetData('https://jsonplaceholder.typicode.com/todos/1');

  console.log(placeholderData);

  const [ data, setData ] = useState([
    {
      id: '2353JD343',
      fullname: 'Mindy Shafer',
      address: '30902 Clubhouse Dr, Laguna Niguel CA 92677',
      phone: '(949) 859-7984'
    }, {
      id: '3431F343D',
      fullname: 'Cindy Trevor',
      address: '67 Bentwood Ln, Aliso Viejo CA 92656',
      phone: '(714) 393-7984'
    },
    {
      id: '5631F843K',
      fullname: 'Monika Rivera',
      address: '27975 Mazagon, Mission Viejo Ca, 92659',
      phone: '(714) 345-2234'
    },
  ]);

  const columns = [
    {
      id: 'id',
      label: 'ID',
      sort: true,
      filter: true
    }, {
      id: 'fullname',
      label: 'Full Name',
      sort: true,
      filter: true
    }, {
      id: 'address',
      label: 'Address',
      sort: true,
      filter: true
    }, {
      id: 'phone',
      label: 'Phone Number',
      sort: true,
      filter: true
    }
  ];

  return (
    <>
      <DataVisualization
        columns={ columns } 
        data={ data }
        slug={ slug }
      />
    </>
  );
  
}

