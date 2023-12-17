/*
  * utils\fetchData.js
  * Author: Jesse Salinas
  * Date: 12/16/2023
*/

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

export const getData = async (url, token) => {

  return fetchData(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
};

export const postData = async (url, body, token) => {

  return fetchData(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body),
  });
};

export const putData = async (url, body) => {

  return fetchData(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body),
  });
};

export const deleteData = async (url) => {

  return fetchData(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
};

