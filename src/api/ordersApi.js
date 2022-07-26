import { API_URL } from '../util/config';
import { getAuthHeader, errorParser } from '../util/util';

export const fetchSecureImage = async (endpoint) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      ...getAuthHeader(),
    },
  };

  const res = await fetch(`${API_URL}${endpoint}`, requestOptions);

  errorParser(res, { message: 'Could not download image' });

  const blob = await res.blob();

  return URL.createObjectURL(blob);
};
