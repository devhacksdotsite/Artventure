 /*
  * routes\Admin\Instructors.js
  * Author: Jesse Salinas
  * Date: 08/06/2023
*/

import { useState, useEffect, useContext } from 'react';

// MUI
import {

} from '@mui/material';

// Components
import { DataVisualization } from '@/components/DataVisualization/';

// Hooks
import { useSlug } from '@/hooks/useSlug';
import { useFetch } from '@/hooks/useFetch';

// Context
import { GlobalCtx } from '@/context/GlobalState';

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
    id: 'location',
    label: 'Location',
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

export const Instructors = () => {
  const { 
    token, 
    setToken 
  } = useContext(GlobalCtx);

  // state
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // hooks
  const { slug } = useSlug();
  const { useGetData, usePostData, usePutData, useDeleteData } = useFetch();

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch('http://localhost:3050/api/private/admin/instructors', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        setData(responseData.instructors);
        setLoading(false);
        setError(null);

      } catch (error) {

        setLoading(false);
        setError(error.message);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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

