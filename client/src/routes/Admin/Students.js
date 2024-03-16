/*
* @\routes\Admin\Students.js
* Name: Students
* Author: Jesse Salinas
* Date: 09/30/2023
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
import { useFilter } from '@/hooks/useFilter';

// Utils
import { getData, postData, putData, deleteData } from '@/utils/fetchData';

// CTX
import { GlobalCtx } from '@/context/GlobalState';

const columns = [
  {
    id: 'student_id',
    label: 'ID',
    sort: true,
    filter: true
  }, {
    id: 'fullname',
    label: 'Full Name',
    sort: true,
    filter: true
  }, {
    id: 'age',
    label: 'Age (yrs.)',
    sort: true,
    filter: true
  }, {
    id: 'school_name',
    label: 'School',
    sort: true,
    filter: true
  }, {
    id: 'date_started',
    label: 'Date Started',
    sort: true,
    filter: true
  }
];

export const Students = () => {
  // CTX
  const { 
    students,
    setStudents
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
      console.log('Filtered? Refetching the data...', filter);

      try {

        const response = await getData('http://localhost:3050/api/private/admin/students', token, logout, filter);

        console.log(response.students);

        setStudents(response.students);

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
        data={ students }
        slug={ slug }
        setter={ setStudents }
        filter={ filter }
        setFilter={ setFilter }
        resetFilter={ resetFilter }
        activeFilter={ activeFilter }
      />
    </>
  );
}

