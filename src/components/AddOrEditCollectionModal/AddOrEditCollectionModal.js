import React, { useState } from 'react';

import { addCollection, editCollection } from '../../api/adminApi';

const AddOrEditCollectionModal = ({ closeModal, currentCollectionBeingEdited = null }) => {
  const [collectionAddEditName, setCollectionAddEditName] = useState(
    currentCollectionBeingEdited?.collectionName || ''
  );

  const handleEditCollectionSubmit = async (e) => {
    e.preventDefault();
    await editCollection(currentCollectionBeingEdited.collectionId, collectionAddEditName);
    closeModal();
  };

  const handleAddCollectionSubmit = async (e) => {
    e.preventDefault();
    await addCollection(collectionAddEditName);
    closeModal();
  };

  return (
    <div className='apc-add-collection'>
      <form
        className='apc-ac-form'
        onSubmit={currentCollectionBeingEdited ? handleEditCollectionSubmit : handleAddCollectionSubmit}
      >
        <input
          value={collectionAddEditName}
          className='apc-ac-input'
          onChange={(e) => {
            setCollectionAddEditName(e.target.value);
          }}
        ></input>
        <button className='apc-ac-add-button' type='submit'>
          <div className='apc-ac-add-text'>{currentCollectionBeingEdited ? 'Edit' : 'Add'}</div>
        </button>
      </form>
    </div>
  );
};

export default AddOrEditCollectionModal;
