/*
* @\hooks\useModal.js
* Name: useModal
* Author: Jesse Salinas
* Date: 08/18/2023
*/

import { useState } from 'react';

export const useModal = () => {
  const [ modal, setModal ] = useState({
    open: false,
    content: null,
    title: "",
    subtitle: ""
  });

  const openModal = (content, title, subtitle) => {
    setModal({
      open: true,
      content,
      title,
      subtitle
    });
  };

  const closeModal = () => {
    setModal(prevData => ({
      ...prevData,
      open: false
    }));
  };

  return {
    modal,
    openModal,
    closeModal
  };
};
