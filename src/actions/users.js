import Types from './actionTypes';
import * as api from '../utils/api';
import paths from '../utils/paths';

function userLoginRequest() {
  return { type: Types.USER_LOGIN_REQUEST };
}
function userLoginResponse(data) {
  return {
    type: Types.USER_LOGIN_RESPONSE,
    payload: data,
  };
}
function userLoginFailure(error) {
  return {
    type: Types.USER_LOGIN_FAILURE,
    payload: error,
  };
}
export function userLogin(data) {
  return dispatch => {
    dispatch(userLoginRequest());
    return api.postEndpoint(`${paths.USERS_LOGIN}`, data)
      .then(user => {
        console.log('====user====', user);
        if (user.error) {
          return dispatch(userLoginFailure(user.error));
        }
        window.localStorage.setItem('jwt', user.token);
        dispatch(userLoginResponse(user))
      })
      .catch(err => dispatch(userLoginFailure(err)));
  }
}

export function confirmUser() {
  return dispatch => api.callEndpoint(`${paths.USER_CHECK}`)
    .then(user => {
      if (!user.error) {
        dispatch(userLoginResponse(user))
      }
    })
    .catch(() => window.localStorage.removeItem('jwt'));
}

function userLogoutResponse() {
  return {
    type: Types.USER_LOGOUT_RESPONSE,
  };
}


export function userLogout() {
  return dispatch => {
    window.localStorage.removeItem('jwt');
    dispatch(userLogoutResponse())
  }
}

function userSignupResponse(data) {
  return {
    type: Types.USER_SIGNUP_RESPONSE,
    payload: data,
  };
}
function userSignupFailure(error) {
  return {
    type: Types.USER_SIGNUP_FAILURE,
    payload: error,
  };
}
export function userSignup(data) {
  return dispatch => api.postEndpoint(`${paths.USERS_SIGNUP}`, data)
    .then(user => {
      if (user.error) {
        return dispatch(userSignupFailure(user.error));
      }
      window.localStorage.setItem('jwt', user.token);
      dispatch(userSignupResponse(user))
    })
    .catch(err => dispatch(userSignupFailure(err)));
}