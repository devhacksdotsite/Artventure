/*
* @\routes\Admin\Attendance.js
* Author: Jesse Salinas
* Date: 08/06/2023
*/

import { useState, useEffect } from 'react';

// MUI
import {

} from '@mui/material';

// Components
import { DataVisualization } from '@/components/DataVisualization/';
import { ManageAttendanceForm } from '@/components/Forms/Attendance/ManageAttendance';

// Hooks
import { useSlug } from '@/hooks/useSlug';
import { useAuth } from '@/hooks/useAuth';
import { useFilter } from '@/hooks/useFilter';

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

export const Attendance = () => {

  // state
  const [ data, setData ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  // hooks
  const { slug } = useSlug();
  const { token, logout } = useAuth();
  const { 
    filter, 
    setFilter, 
    resetFilter, 
    activeFilter 
  } = useFilter();


  /* Attendance */
  const [attendingStudents, setAttendingStudents] = useState([
    { name: 'John Doe', avatar: 'https://example.com/johndoe.jpg' },
    { name: 'Jane Doe', avatar: 'https://example.com/janedoe.jpg' },
    // Add more attending students as needed
  ]);

  const handleCheckIn = (student) => {
    // Implement check-in logic
    console.log(`Checked in ${student.name}`);
  };

  const handleMarkAbsence = (student) => {
    // Implement mark absence logic
    console.log(`Marked absence for ${student.name}`);
  };

  const handleDeleteStudent = (student) => {
    setAttendingStudents((prevStudents) =>
      prevStudents.filter((s) => s.name !== student.name)
    );
  };

  useEffect(() => {
    console.log('fetching data...');
    /*const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/instructors');
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

    fetchData();*/

    setTimeout(() => {
  
      setLoading(false);
    }, 1000);

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
        filter={ filter }
        setFilter={ setFilter }
        resetFilter={ resetFilter }
        activeFilter={ activeFilter }
        showDate={ true }
      >
        <>
          <p>Spots Filled: 7/8</p>
          <ManageAttendanceForm
            attendingStudents={ attendingStudents }
            onCheckIn={ handleCheckIn }
            onMarkAbsence={ handleMarkAbsence }
            onDelete={ handleDeleteStudent }
          /> 
        </>
      </DataVisualization>
    </>
  );
  
}

