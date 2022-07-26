import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../util/types';

const initialState = { isLoggedIn: false, token: null, isAdmin: false, name: null };

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
        name: null,
        token: null,
        isAdmin: null,
        email: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        name: null,
        token: null,
        isAdmin: null,
        email: null,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        name: null,
        token: null,
        isAdmin: null,
        email: null,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
        name: null,
        token: null,
        isAdmin: null,
        email: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        name: action.payload.name,
        token: action.payload.token,
        isAdmin: action.payload.isAdmin,
        email: action.payload.email,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        name: null,
        token: null,
        isAdmin: null,
        email: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        name: null,
        token: null,
        isAdmin: null,
        email: null,
      };
    default:
      return state;
  }
};
