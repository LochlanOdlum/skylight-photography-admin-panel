import React, { useState, useEffect } from 'react';

import { getCollections } from '../../api/adminApi';
import NavSideBar from '../../components/NavSideBar/NavSideBar';
import ModalParent from '../../components/ModalParent/ModalParent';
import AddOrEditCollectionModal from '../../components/AddOrEditCollectionModal/AddOrEditCollectionModal';

import './CollectionsPage.scss';

const CollectionsPage = () => {
  const [collections, setCollections] = useState([]);
  const [currentCollectionBeingEdited, setCurrentCollectionBeingEdited] = useState(null);
  const [isCollectionAddEditOpen, setIsCollectionAddEditOpen] = useState(false);

  const getSetCollections = async () => {
    const resCollections = await getCollections();
    setCollections(resCollections);
  };

  useEffect(() => {
    getSetCollections();
  }, []);

  const closeModal = () => {
    setIsCollectionAddEditOpen(false);
    setCurrentCollectionBeingEdited(null);
    getSetCollections();
  };

  const handleEditCollectionButtonClick = (collectionId, collectionName) => {
    setCurrentCollectionBeingEdited({ collectionId, collectionName });
    setIsCollectionAddEditOpen(true);
  };

  const renderCollectionTableRows = () => {
    return collections.map((collection) => {
      // console.log(collection);
      const [creationDate, creationTime] = collection.createdAt.split('.')[0].split('T');

      return (
        <tr className='card-table-row'>
          <td className='card-table-cell text-center'>{collection.name}</td>
          <td className='card-table-cell text-center'>
            {creationTime} {creationDate.split('-').join('/')}{' '}
          </td>
          <td className='card-table-cell text-center'>
            <button
              className='table-button edit-button'
              onClick={() => {
                handleEditCollectionButtonClick(collection.id, collection.name);
              }}
            >
              Edit
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <NavSideBar />
      {isCollectionAddEditOpen && (
        <ModalParent closeModal={closeModal}>
          <AddOrEditCollectionModal
            closeModal={closeModal}
            currentCollectionBeingEdited={currentCollectionBeingEdited}
          />
        </ModalParent>
      )}
      <div className='panel-page'>
        <div className='panel-page-inner'>
          <div className='card-table-container card'>
            <div className='card-table-header'>
              Collections
              <button
                className='table-button add-button table-header-add-button'
                onClick={() => {
                  setIsCollectionAddEditOpen(true);
                }}
              >
                Add Collection
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  {/* <th className='admin-table-cell'>#</th> */}
                  <th className='card-table-cell card-table-header-cell'>Collection</th>
                  <th className='card-table-cell card-table-header-cell'>Date Added</th>
                  <th className='card-table-cell card-table-header-cell'>Actions</th>
                </tr>
              </thead>
              <tbody>{renderCollectionTableRows()}</tbody>
            </table>
            <div className='card-table-footer'></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionsPage;
