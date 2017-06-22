import axios from 'axios';
import pathToRegexp from 'path-to-regexp';

const fetch = (options) => {
  let {
    method = 'get',
    data,
    fetchType,
    url,
  } = options;

  const match = pathToRegexp.parse(url);
  url = pathToRegexp.compile(url)(data);
  for (let item of match) {
    if (item instanceof Object && item.name in data) {
      delete data[item.name];
    }
  }

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: data,
      });
    case 'post':
      return axios.post(url, data);
    case 'put':
      return axios.put(url, data);
    case 'patch':
      return axios.patch(url, data);
    default:
      return axios(options);
  }
};

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(options) {
  return fetch(options)
    //.then(checkStatus)
    //.then(parseJSON)
    .then((data) => {
      if (options.cb) {
        options.cb();
      }
      return {
        success: true,
        ...data.data,
      };
    })
    .catch(err => ({ err }));
}
