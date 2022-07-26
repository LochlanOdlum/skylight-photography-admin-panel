import { makeRequest } from '../util/util.js';

export const apiLogin = async (email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  };

  const data = await makeRequest('/login', requestOptions);
  const { token, isUserAdmin, UsersEmail, UsersName } = data;

  return { token, isUserAdmin, UsersEmail, UsersName };
};
