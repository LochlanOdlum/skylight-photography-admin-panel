import React, { useRef, useState, useEffect } from 'react';

import { addPhoto, editPhoto, getCollections } from '../../api/adminApi';

import './AddOrEditPhotoModal.scss';

const AddOrEditPhotoModal = ({ currentPhotoBeingEdited = null, closeModal }) => {
  //If edit mode then set these default values to values passed from props
  // const { collections, isLoaded: isCollectionsLoaded } = useCollections();
  const imageUploadInputLabelEle = useRef(null);
  const [collectionId, setCollectionId] = useState(currentPhotoBeingEdited?.collectionId || '');
  const [photoTitle, setPhotoTitle] = useState(currentPhotoBeingEdited?.title || '');
  const [photoDescription, setPhotoDescription] = useState(currentPhotoBeingEdited?.description || '');
  const [photoPrice, setPhotoPrice] = useState(currentPhotoBeingEdited?.priceInPence / 100 || '');
  const [photoURL, setPhotoURL] = useState(currentPhotoBeingEdited?.imageWmarkedMedPublicURL || null);
  const [imageFile, setImageFile] = useState(null);
  const [collections, setCollections] = useState(null);

  //Insures the closeModal function gets called when component unmounts.
  //closeModal helps with cleanup so is important to insure it runs
  // useEffect(() => {
  //   return () => {
  //     closeModal();
  //   };
  // }, [closeModal]);
  useEffect(() => {
    const getSetCollections = async () => {
      const resCollections = await getCollections();
      setCollections(resCollections);
    };

    getSetCollections();
  }, []);

  useEffect(() => {
    if (collections && !collectionId) {
      setCollectionId(collections[0].id);
    }
  }, [collections, collectionId]);

  const handleImageUploadChange = (e) => {
    if (!e.target.files || !e.target.files[0]) {
      return;
    }

    setImageFile(e.target.files[0]);

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoURL(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleAddPhoto = async () => {
    const priceInPence = photoPrice * 100;

    await addPhoto(imageFile, photoTitle, photoDescription, priceInPence, collectionId);

    closeModal();
  };

  const handleEditPhoto = async () => {
    const priceInPence = photoPrice * 100;

    await editPhoto(currentPhotoBeingEdited.id, {
      imageFile,
      photoTitle,
      photoDescription,
      priceInPence,
      collectionId,
    });

    closeModal();
  };

  const renderCollectionSelect = () => {
    if (!collections) {
      return null;
    }

    return collections.map((collection) => {
      return (
        <option value={collection.id} key={collection.id}>
          {collection.name}
        </option>
      );
    });
  };

  return (
    <div className='image-upload-modal'>
      <div className='image-upload-image-input-parent'>
        <label
          htmlFor='image-upload-image-input'
          className='image-upload-image-input-label'
          ref={imageUploadInputLabelEle}
          style={{ backgroundImage: `url('${photoURL}')` }}
        >
          {!photoURL && <div>+ Select Photo</div>}
        </label>
        <input
          type='file'
          accept='image/png, image/jpg, image/jpeg, image/webp'
          onChange={handleImageUploadChange}
          id='image-upload-image-input'
        />
      </div>
      <div className='image-upload-input-grid'>
        <label className='iu-input-grid-label'>Title</label>
        <input
          className='iu-input-field'
          type='text'
          value={photoTitle}
          onChange={(e) => setPhotoTitle(e.target.value)}
        />

        <label className='iu-input-grid-label'>Collection</label>
        <select
          className='iu-input-field iu-input-field-collection'
          value={collectionId}
          onChange={(e) => {
            setCollectionId(e.target.value);
          }}
        >
          {renderCollectionSelect()}
        </select>

        <label className='iu-input-grid-label'>Price</label>
        <input
          className='iu-input-field iu-input-field-price'
          pattern='d\+\.\d\d$'
          type='number'
          step='.01'
          value={photoPrice}
          onChange={(e) => {
            const validated = e.target.value.match(/^(\d*\.{0,1}\d{0,2}$)/);
            if (validated) {
              setPhotoPrice(e.target.value);
            }
          }}
        />

        <label className='iu-input-grid-label'>Description</label>
        <textarea
          className='iu-input-field iu-description-textarea'
          value={photoDescription}
          onChange={(e) => setPhotoDescription(e.target.value)}
        />
      </div>
      <button
        onClick={currentPhotoBeingEdited ? handleEditPhoto : handleAddPhoto}
        className='image-upload-submit-button'
      >
        {currentPhotoBeingEdited ? 'Edit' : 'Add Photo'}
      </button>
    </div>
  );
};

export default AddOrEditPhotoModal;
