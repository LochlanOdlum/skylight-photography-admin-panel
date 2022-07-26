import React, { useState } from 'react';

import './PhotoPositionField.scss';

const PhotoPositionField = ({ position, onSubmit }) => {
  const [positionInputValue, setPositionInputValue] = useState(position);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log('submited');
        onSubmit(positionInputValue);
      }}
    >
      <input
        className='admin-table-cell-input table-orderPos-input'
        value={positionInputValue}
        onChange={(e) => {
          setPositionInputValue(e.target.value);
        }}
      />
    </form>
  );
};

export default PhotoPositionField;
