import Types from './actionTypes';
import * as api from '../utils/api';
import paths from '../utils/paths';

function userLoginRequest() {
  return { type: Types.USER_LOGIN_REQUEST };
}
function userLoginResponse(data: any) {
  return {
    type: Types.USER_LOGIN_RESPONSE,
    payload: data,
  };
}
function userLoginFailure(error: any) {
  return {
    type: Types.USER_LOGIN_FAILURE,
    payload: error,
  };
}
export function userLogin(data: any) {
  return (dispatch: any) => {
    dispatch(userLoginRequest());
    return api.postEndpoint(`${paths.USERS_LOGIN}`, data)
      .then(user => {
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
  return (dispatch: any) => api.callEndpoint(`${paths.USER_CHECK}`)
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
  return (dispatch: any) => {
    window.localStorage.removeItem('jwt');
    dispatch(userLogoutResponse())
  }
}

function userSignupResponse(data: any) {
  return {
    type: Types.USER_SIGNUP_RESPONSE,
    payload: data,
  };
}
function userSignupFailure(error: any) {
  return {
    type: Types.USER_SIGNUP_FAILURE,
    payload: error,
  };
}
export function userSignup(data: any) {
  return (dispatch: any) => api.postEndpoint(`${paths.USERS_SIGNUP}`, data)
    .then(user => {
      if (user.error) {
        return dispatch(userSignupFailure(user.error));
      }
      window.localStorage.setItem('jwt', user.token);
      dispatch(userSignupResponse(user))
    })
    .catch(err => dispatch(userSignupFailure(err)));
}

function fetchUsersResponse(data: any) {
  return {
    type: Types.FETCH_USER_RESPONSE,
    payload: data,
  };
}
export function fetchUsers(qs: any) {
  return (dispatch: any) => api.callEndpoint(`${paths.USERS_LIST}${qs}`)
    .then(data => {
      dispatch(fetchUsersResponse(data))
    })
    .catch(err => dispatch(userSignupFailure(err)));
}

export function updateUserData(data: any, qs: any) {
  return (dispatch: any) => api.updateEndPoint(`${paths.USER_UPDATE}`, data)
    .then(() => {
      dispatch(fetchUsers(qs))
    });
}

export function deleteUser(data: any, qs: any) {
  return (dispatch: any) => api.deleteEndPoint(`${paths.DELETE_USER}`, data)
    .then(() => {
      dispatch(fetchUsers(qs))
    });
}
