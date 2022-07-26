import { API_URL } from './config';
import { store } from '../index';
import { logout } from '../actions/authActions';

// store.dispatch(logout());

export const errorParser = (response, data) => {
  console.log('t');
  if (!response.ok) {
    if (response.status === 401) {
      store.dispatch(logout());
    }

    throw new Error(data.message || data.errors || 'Unexpected error');
  }
};

export const getAuthHeader = () => {
  const userToken = store.getState().auth.token;

  return userToken ? { Authorization: `Bearer ${userToken}` } : {};
};

export const makeRequest = async (path, requestOptions = {}) => {
  //Ensures there is always auth header in request if possible
  const headers = { ...requestOptions?.headers, ...getAuthHeader() };
  const authRequestOptions = { ...requestOptions, headers };

  const response = await fetch(API_URL + path, authRequestOptions);

  const data = await response.json();

  errorParser(response, data);

  return data;
};
