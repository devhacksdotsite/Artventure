/*
* @\routes\Admin\Patrons.js
* Name: Patrons
* Author: Jesse Salinas
* Date: 02/08/2024
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
    id: 'patron_id',
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

export const Patrons = () => {
  // CTX
  const { 
    patrons,
    setPatrons
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

        const response = await getData('/api/private/admin/patrons', token, logout, filter);

        setPatrons(response.patrons);

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
        data={ patrons }
        slug={ slug }
        setter={ setPatrons }
        filter={ filter }
        setFilter={ setFilter }
        resetFilter={ resetFilter }
        activeFilter={ activeFilter }
      />
    </>
  );
  
}

