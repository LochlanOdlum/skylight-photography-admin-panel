import React, { useEffect, useState } from 'react';

import { getUsers } from '../../api/adminApi';
import NavSideBar from '../../components/NavSideBar/NavSideBar';
import PageNumberNav from '../../components/PageNumberNav/PageNumberNav';
import ConfirmDeleteUserModal from '../../components/ConfirmDeleteUserModal/ConfirmDeleteUserModal';
import ModalParent from '../../components/ModalParent/ModalParent';

import './UsersPage.scss';

const UsersPage = () => {
  const [users, setUsers] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [userDeleteConfirmation, setUserDeleteConfirmation] = useState({ isOpen: false, userId: null });

  const closeUserDeleteConfirmationModal = () => {
    setUserDeleteConfirmation({ isOpen: false, userId: null });
  };

  const updateUsers = async () => {
    try {
      const { users, pageCount } = await getUsers(activePage, 8);
      setTotalPages(pageCount);
      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    updateUsers();
    // eslint-disable-next-line
  }, [activePage]);

  useEffect(() => {
    if (!userDeleteConfirmation.isOpen) {
      updateUsers();
    }
    // eslint-disable-next-line
  }, [userDeleteConfirmation]);

  const renderTableRows = () => {
    if (!users) {
      return null;
    }

    return users.map((user) => {
      const [creationDate, creationTime] = user.createdAt.split('.')[0].split('T');

      return (
        <tr className='card-table-row'>
          {/* <td className='text-center'>
            <img className='admin-page-photo-preview' src={photo.imageWmarkedMedSquarePublicURL} />
          </td> */}
          <td className='card-table-cell text-center'>{user.name}</td>
          <td className='card-table-cell text-center'>{user.email}</td>
          <td className='card-table-cell text-center'>
            {creationTime} {creationDate.split('-').join('/')}
          </td>
          <td className='card-table-cell text-center'>
            <button
              className='table-button delete-button'
              onClick={() => {
                setUserDeleteConfirmation({ isOpen: true, userId: user.id });
              }}
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
      {userDeleteConfirmation.isOpen && (
        <ModalParent closeModal={closeUserDeleteConfirmationModal}>
          <ConfirmDeleteUserModal
            userId={userDeleteConfirmation.userId}
            closeModal={closeUserDeleteConfirmationModal}
          />
        </ModalParent>
      )}
      <div className='panel-page'>
        <div className='panel-page-inner'>
          <div className='card-table-container card'>
            <div className='card-table-header'>Users</div>
            <table>
              <thead>
                <tr>
                  <th className='card-table-cell card-table-header-cell'>Name</th>
                  <th className='card-table-cell card-table-header-cell'>Email</th>
                  <th className='card-table-cell card-table-header-cell'>Creation Date</th>
                  {/* <th className='card-table-cell card-table-header-cell'>Price</th> */}
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

export default UsersPage;
