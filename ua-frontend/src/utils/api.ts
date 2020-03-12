import apiPaths from './paths';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${window.localStorage.getItem('jwt')}`
};

export function callEndpoint(endpoint: string) {
  const url = apiPaths.API_URL + endpoint;
  return fetch(url, {
    credentials: 'include',
    headers,
  })
    .then((res) => {
      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }
      return res.json();
    }).catch(err => {
      return err;
    });
}

export function postEndpoint(endpoint: string, data: any) {
  const url = apiPaths.API_URL + endpoint;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers,
    credentials: 'include'
  }).then((res) => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return res.json();
  }).catch(err => {
    return err;
  });
}

export function updateEndPoint(endpoint: string, data: any) {
  const url = apiPaths.API_URL + endpoint;
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers,
    credentials: 'include'
  }).then((res) => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return res.json();
  }).catch(err => {
    return err;
  });
}

export function deleteEndPoint(endpoint: string, data: any) {
  const url = apiPaths.API_URL + endpoint;
  return fetch(url, {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers,
    credentials: 'include'
  }).then((res) => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return res.json();
  }).catch(err => {
    return err;
  });
}
