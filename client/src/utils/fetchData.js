/*
  * utils\fetchData.js
  * Name: fetchData
  * Author: Jesse Salinas
  * Date: 12/16/2023
*/

const serializeParams = (url, params) => {

  // Create a query string from the params object
  const queryString = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

  // Append the query string to the URL
  return `${url}?${queryString}`;
}

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

export const getData = async (url, token, logout, params) => {

  let apiURL = url;

  if (params) {
    apiURL = serializeParams(url, params);
  }

  return fetchData(apiURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }, logout);
};

export const postData = async (url, body, token, logout, params) => {

  let apiURL = url;

  if (params) {
    apiURL = serializeParams(url, params);
  }

  return fetchData(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body),
  }, logout);
};

export const putData = async (url, body, token, logout, params) => {

  let apiURL = url;

  if (params) {
    apiURL = serializeParams(url, params);
  }

  return fetchData(apiURL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body),
  }, logout);
};

export const deleteData = async (url, token, logout, params) => {

  let apiURL = url;

  if (params) {
    apiURL = serializeParams(url, params);
  }

  return fetchData(apiURL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }, logout);
};

