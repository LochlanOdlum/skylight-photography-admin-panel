import React, { useEffect, useState } from 'react';

import { getPhotos, editPhoto, deletePhoto } from '../../api/adminApi';
import ModalParent from '../../components/ModalParent/ModalParent';
import AddOrEditPhotoModal from '../../components/AddOrEditPhotoModal/AddOrEditPhotoModal';
import NavSideBar from '../../components/NavSideBar/NavSideBar';
import PageNumberNav from '../../components/PageNumberNav/PageNumberNav';

import PhotoPositionField from '../../components/PhotoPositionFIeld/PhotoPositionField';

import './PhotosPage.scss';

const PhotosPage = () => {
  const [showImageAddOrEditModal, setShowImageAddOrEditModal] = useState(false);
  const [currentPhotoBeingEdited, setCurrentPhotoBeingEdited] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [activePage, setActivePage] = useState(1);

  const closeImageAddOrEditModal = () => {
    setCurrentPhotoBeingEdited(null);
    setShowImageAddOrEditModal(false);
  };

  const updatePhotos = async () => {
    try {
      const { products: photos, pageCount } = await getPhotos(activePage, 8);
      setTotalPages(pageCount);
      setPhotos(photos);
    } catch (error) {
      console.error(error);
    }
  };

  //Update Photos whenever image add or edit modal is closed. To ensure photos are up to date with any changes
  useEffect(() => {
    if (!showImageAddOrEditModal) {
      updatePhotos();
    }
    // eslint-disable-next-line
  }, [showImageAddOrEditModal]);

  useEffect(() => {
    updatePhotos();
    // eslint-disable-next-line
  }, [activePage]);

  const handleAddPhotoButtonClick = () => {
    setShowImageAddOrEditModal(true);
  };

  const handleEditPhotoButtonClick = (photo) => {
    setCurrentPhotoBeingEdited(photo);
    setShowImageAddOrEditModal(true);
  };

  const handleDeletePhotoButtonClick = async (photoId) => {
    await deletePhoto(photoId);
    updatePhotos();
  };

  const renderTableRows = () => {
    if (!photos) {
      return null;
    }

    return photos.map((photo) => {
      const [creationDate, creationTime] = photo.createdAt.split('.')[0].split('T');

      const handlePhotoPositionChange = async (newPosition) => {
        await editPhoto(photo.id, { orderPosition: newPosition });
        updatePhotos();
      };

      return (
        <tr className='card-table-row' key={Math.random()}>
          <td className='card-table-cell text-center'>
            <PhotoPositionField position={photo.orderPosition} onSubmit={handlePhotoPositionChange} />
          </td>
          <td className='text-center'>
            <img
              className='card-table-photos-image-preview'
              alt='whatever'
              src={photo.imageWmarkedMedSquarePublicURL}
            />
          </td>
          <td className='card-table-cell'>{photo.title}</td>
          <td className='card-table-cell text-center'>
            {creationTime} {creationDate.split('-').join('/')}
          </td>
          <td className='card-table-cell text-center'>£{photo.priceInPence / 100}</td>
          <td className='card-table-cell text-center'>
            <button
              onClick={() => {
                handleEditPhotoButtonClick(photo);
              }}
              className='table-button details-button'
            >
              Edit
            </button>
            <button
              onClick={() => {
                handleDeletePhotoButtonClick(photo.id);
              }}
              className='table-button delete-button card-table-photos-delete-button'
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <NavSideBar />
      {showImageAddOrEditModal && (
        <ModalParent closeModal={closeImageAddOrEditModal}>
          <AddOrEditPhotoModal
            currentPhotoBeingEdited={currentPhotoBeingEdited}
            setCurrentPhotoBeingEdited={setCurrentPhotoBeingEdited}
            closeModal={closeImageAddOrEditModal}
          />
        </ModalParent>
      )}
      <div className='panel-page t'>
        <div className='panel-page-inner'>
          <div className='card-table-container card'>
            <div className='card-table-header'>
              Photos
              <button className='table-button add-button table-header-add-button' onClick={handleAddPhotoButtonClick}>
                Add Photo
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th className='card-table-cell card-table-header-cell'>Pos.</th>
                  <th className='card-table-cell card-table-header-cell'>Preview</th>
                  <th className='card-table-cell card-table-header-cell text-left'>Title</th>
                  <th className='card-table-cell card-table-header-cell'>Date</th>
                  <th className='card-table-cell card-table-header-cell'>Price</th>
                  <th className='card-table-cell card-table-header-cell'>Actions</th>
                </tr>
              </thead>
              <tbody>{renderTableRows()}</tbody>
            </table>
            <div className='card-table-footer'>
              <div className='card-table-page-buttons'>
                <PageNumberNav activePage={activePage} setActivePage={setActivePage} maxPage={totalPages} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotosPage;
