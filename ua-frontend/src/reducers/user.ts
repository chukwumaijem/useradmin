import Types from '../actions/actionTypes';
import { IAction } from '../interfaces';

const initialState = {
  isLoggedIn: false,
  isLookingForUser: false,
  data: {
  }
};

export default function users(state = initialState, action: IAction) {
  switch (action.type) {
    case Types.USER_LOGIN_REQUEST:
      return Object.assign({}, state, {
        isLookingForUser: true
      });
    case Types.USER_LOGIN_RESPONSE:
      return Object.assign({}, state, {
        data: action.payload.data,
        isLookingForUser: false,
        isLoggedIn: true,
      });
    case Types.USER_LOGIN_FAILURE:
      return Object.assign({}, state, {
        isLookingForUser: false,
        error: action.payload,
      });
    case Types.USER_LOGOUT_RESPONSE:
      return Object.assign({}, state, {
        isLoggedIn: false,
      });
    case Types.USER_SIGNUP_RESPONSE:
      return Object.assign({}, state, {
        data: action.payload.data,
        isLoggedIn: true,
      });
    case Types.USER_SIGNUP_FAILURE:
      return Object.assign({}, state, {
        error: action.payload,
      });
    case Types.FETCH_USER_RESPONSE:
      return Object.assign({}, state, {
        usersList: action.payload
      });
    default:
      return state;
  }
}
