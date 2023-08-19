/*
  * hooks\useFetch.js
  * Author: Jesse Salinas
  * Date: 08/18/2023
*/

import { useState, useEffect } from 'react';

// TODO: data will be stored in the context
// this way we can readily fetch an update the data from anywhere in the application

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        setData(responseData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [ url, options ]);

  const getData = (url) => useFetch(url);

  const postData = (url, body) =>
    useFetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

  const putData = (url, body) =>
    useFetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

  const deleteData = (url) =>
    useFetch(url, {
      method: 'DELETE',
    });

  return { 
    getData,
    postData,
    putData,
    deleteData,
    loading, 
    error 
  };
};


