/*
* @\routes\Admin\Instructors.js
* Name: Instructors
* Author: Jesse Salinas
* Date: 08/06/2023
*/

import { useState, useEffect, useContext } from 'react';

// Components
import { DataVisualization } from '@/components/DataVisualization/';

// Hooks
import { useSlug } from '@/hooks/useSlug';
import { useAuth } from '@/hooks/useAuth';
import { useFilter } from '@/hooks/useFilter';

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
  // CTX
  const { 
    instructors,
    setInstructors
  } = useContext(GlobalCtx);

  // State
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  // Hooks
  const { slug } = useSlug();
  const { token, logout } = useAuth();
  const { 
    filter, 
    setFilter, 
    resetFilter, 
    activeFilter 
  } = useFilter();

  useEffect(() => {
    const fetchData = async () => {

      setLoading(true);
      console.log('Refetching the data...', filter);

      try {

        const response = await getData('/api/private/admin/instructors', token, logout, filter);

        console.log(response.instructors);

        setInstructors(response.instructors);

        setLoading(false);

      } catch (error) {

        setLoading(false);
        setError(error.message);
      }
    }

    fetchData();
  }, [ filter ]); 

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
        filter={ filter }
        setFilter={ setFilter }
        resetFilter={ resetFilter }
        activeFilter={ activeFilter }
      />
    </>
  );
  
}

