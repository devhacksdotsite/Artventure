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
import { useAuth } from '@/hooks/useAuth';

// Utils
import { getData, postData, putData, deleteData } from '@/utils/fetchData';

// Context
import { GlobalCtx } from '@/context/GlobalState';

const columns = [
  {
    id: 'instructor_id',
    label: 'ID',
    sort: true,
    filter: true
  }, {
    id: 'instructor_name',
    label: 'Full Name',
    sort: true,
    filter: true
  }, {
    id: 'school_name',
    label: 'School',
    sort: true,
    filter: true
  }, {
    id: 'address',
    label: 'Location',
    sort: true,
    filter: true
  }, {
    id: 'date_started',
    label: 'Date Started',
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
  const [ data, setData ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  // hooks
  const { slug } = useSlug();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await getData('http://localhost:3050/api/private/admin/instructors', token, logout);

        setData(response.instructors);

        setLoading(false);

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

