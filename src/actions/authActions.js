import { apiLogin } from '../api/authApi';

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../util/types';

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { token, isUserAdmin, UsersEmail, UsersName } = await apiLogin(email, password);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token, isAdmin: isUserAdmin, name: UsersName, email: UsersEmail },
    });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL });
  }
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
