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

// CTX
import { GlobalCtx } from '@/context/GlobalState';

const columns = [
  {
    id: 'instructor_id',
    label: 'ID',
    sort: true,
    filter: true
  }, {
    id: 'fullname',
    label: 'Full Name',
    sort: true,
    filter: true
  }, {
    id: 'school_name',
    label: 'School',
    sort: true,
    filter: true
  }, {
    id: 'phone',
    label: 'Phone',
    sort: true,
    filter: true
  },  {
    id: 'email',
    label: 'Email',
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
    instructors,
    setInstructors
  } = useContext(GlobalCtx);

  // state
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  // Hooks
  const { slug } = useSlug();
  const { token, logout } = useAuth();

  const handlers = {
    addInstructor: () => {

      console.log('add instructor logic here');
    }, 
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await getData('http://localhost:3050/api/private/admin/instructors', token, logout);
        console.log(response.instructors);

        setInstructors(response.instructors);

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
        data={ instructors }
        slug={ slug }
        setter={ setInstructors }
      />
    </>
  );
  
}

