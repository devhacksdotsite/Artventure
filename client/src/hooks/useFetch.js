/*
  * hooks\useFetch.js
  * Author: Jesse Salinas
  * Date: 08/18/2023
*/

import { useState, useEffect } from 'react';

export const useFetch = () => {
  const fetchData = async (url, options) => {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (err) {
      throw err;
    }
  };

  const useFetchData = (url, requestOptions) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log('url is: ', url);

    useEffect(() => {
      fetchData(url, requestOptions)
        .then(responseData => {
          setData(responseData);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    }, []);

    return {
      data,
      loading,
      error,
    };
  };

  const useGetData = (url) => useFetchData(url, {
    method: 'GET',
  });

  const usePostData = (url, body) => useFetchData(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const usePutData = (url, body) => useFetchData(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const useDeleteData = (url) => useFetchData(url, {
    method: 'DELETE',
  });

  return {
    useGetData,
    usePostData,
    usePutData,
    useDeleteData,
  };
};

