import { makeRequest } from '../util/util.js';

//Order services -------------------------------
export const getOrders = async (page, resultsPerPage) => {
  return await makeRequest(`/admin/orders?page=${page}&resultsPerPage=${resultsPerPage}`);
};

export const getOrderDetails = async (orderId) => {
  return await makeRequest(`/admin/orderDetails/${orderId}`);
};

//User services ---------------------------------
export const getUsers = async (page, resultsPerPage) => {
  return await makeRequest(`/admin/users?page=${page}&resultsPerPage=${resultsPerPage}`);
};

export const deleteUser = async (userId) => {
  const requestOptions = {
    method: 'DELETE',
  };

  return await makeRequest(`/admin/user/${userId}`, requestOptions);
};

export const getUserDetails = async (userId) => {
  return await makeRequest(`/admin/userDetails/${userId}`);
};

//Collection services -----------------------------
export const getCollections = async () => {
  return await makeRequest('/shop/collections');
};

export const addCollection = async (collectionName) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ collectionName }),
  };
  return await makeRequest('/admin/collection', requestOptions);
};

export const editCollection = async (collectionId, updatedCollectionName) => {
  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ updatedCollectionName }),
  };
  return await makeRequest(`/admin/collection/${collectionId}`, requestOptions);
};

//Photo services ---------------------------------
export const addPhoto = async (imageFile, photoTitle, photoDescription, priceInPence, collectionId) => {
  const formData = new FormData();

  formData.append('image', imageFile);
  formData.append('title', photoTitle);
  formData.append('collectionId', collectionId);
  formData.append('description', photoDescription);
  formData.append('priceInPence', priceInPence);

  const requestOptions = {
    method: 'POST',
    body: formData,
  };

  return await makeRequest(`/admin/photo`, requestOptions);
};

export const getPhotos = async (page, resultsPerPage) => {
  return await makeRequest(`/admin/photos?page=${page}&resultsPerPage=${resultsPerPage}`);
};

export const editPhoto = async (photoId, editedFields) => {
  const { orderPosition, imageFile, photoTitle, photoDescription, priceInPence, collectionId } = editedFields;

  const formData = new FormData();

  formData.append('image', imageFile);
  formData.append('orderPosition', orderPosition);
  formData.append('title', photoTitle);
  formData.append('collectionId', collectionId);
  formData.append('description', photoDescription);
  formData.append('priceInPence', priceInPence);

  const requestOptions = {
    method: 'PATCH',
    body: formData,
  };

  return await makeRequest(`/admin/photo/${photoId}`, requestOptions);
};

export const deletePhoto = async (photoId) => {
  return await makeRequest(`/admin/photo/${photoId}`, { method: 'DELETE' });
};

export const getRecentOrders = async (limit) => {
  return await makeRequest(`/admin/recentOrders${limit ? `?limit=${limit}` : ''}`);
};

export const getSummaryDetails = async () => {
  return await makeRequest('/admin/summaryDetails');
};
