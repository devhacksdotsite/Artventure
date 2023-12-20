/*
  * utils\fetchData.js
  * Author: Jesse Salinas
  * Date: 12/16/2023
*/

const fetchData = async (url, options, logout) => {

  try {
    const response = await fetch(url, options);

    if (!response.ok) {

      // Check error status 403 (Forbidden)
      if (response && response.status === 403 && logout) {
        logout();
      }

      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {

    throw error;
  }
};

export const getData = async (url, token, logout) => {

  return fetchData(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }, logout);
};

export const postData = async (url, body, token, logout) => {

  return fetchData(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body),
  }, logout);
};

export const putData = async (url, body, logout) => {

  return fetchData(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body),
  }, logout);
};

export const deleteData = async (url, logout) => {

  return fetchData(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }, logout);
};

