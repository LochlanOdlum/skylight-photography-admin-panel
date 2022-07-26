import React, { useEffect, useState } from 'react';

import { deleteUser, getUserDetails } from '../../api/adminApi';

import './ConfirmDeleteUserModal.scss';

const ConfirmDeleteUserModal = ({ userId, closeModal }) => {
  const [userDetails, setUserDetails] = useState();
  const [emailConfirmInputText, setEmailConfirmInputText] = useState('');

  const handleClickDelete = async () => {
    if (!userDetails || !userDetails.user.email) {
      return;
    }

    if (emailConfirmInputText !== userDetails.user.email) {
      //UX code here to show that email typed doesn't match
      return;
    }

    await deleteUser(userId);
    closeModal();
  };

  useEffect(() => {
    const getUserDetils = async () => {
      const user = await getUserDetails(userId);
      setUserDetails(user);
    };
    try {
      getUserDetils();
    } catch {}
  }, [userId]);

  return (
    <div className='acdum'>
      {!userDetails && <div>Loading </div>}
      {userDetails && (
        <>
          <div className='acdum-header'>Are you sure?</div>
          <div className='acdum-main'>
            <div className='acdum-user-table-pretext'>You're about to delete this user.</div>
            <div className='acdum-user-table'>
              <div className='acdum-ut-od-item acdum-ut-od-1'>Email</div>
              <div className='acdum-ut-od-item acdum-ut-od-2'>Name</div>
              <div className='acdum-ut-od-item acdum-ut-od-3 text-center'>Order Count</div>
              <div className='acdum-ut-od-item acdum-ut-od-4'>{userDetails.user.email}</div>
              <div className='acdum-ut-od-item acdum-ut-od-5'>{userDetails.user.name}</div>
              <div className='acdum-ut-od-item acdum-ut-od-6 text-center'>{userDetails.orderCount}</div>
            </div>
            <div className='acdum-warning-text'>
              This deletes this users account permenantly. All orders related to this account will still remain and are
              available to the customer through their email.
            </div>
            <div className='acdum-confirm-email-container'>
              <div className='acdum-confirm-email-text'>Type the users EMAIL to confirm</div>
              <input
                className='acdum-email-confirm-input'
                placeholder={userDetails.user.email}
                type='text'
                onChange={(e) => {
                  setEmailConfirmInputText(e.target.value);
                }}
              />
            </div>
          </div>
          <div className='acdum-footer'>
            <button
              className='admin-table-delete-button acdum-footer-delete-button delete-button'
              onClick={handleClickDelete}
            >
              Delete
            </button>
            <button className='acdum-footer-cancel-button' onClick={closeModal}>
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ConfirmDeleteUserModal;
