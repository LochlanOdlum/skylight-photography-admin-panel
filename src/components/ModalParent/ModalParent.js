import React, { useRef } from 'react';

import useOnClickOutsideElement from '../../hooks/useOnClickOutsideElement';

import './ModalParent.scss';

const ModalParent = ({ children, closeModal }) => {
  const childRef = useRef(null);
  useOnClickOutsideElement(childRef, closeModal);

  return (
    <div className='modal-parent'>
      <div ref={childRef}>{children}</div>
    </div>
  );
};

export default ModalParent;
