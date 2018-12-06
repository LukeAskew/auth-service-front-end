import axios from 'axios';
import Cookies from 'js-cookie';
import { get } from 'lodash';
import { API_URL } from '../config';

/**
 * Extract errors from API response
 * @param {Object} e
 * @returns {Object}
 */
export function getResponseErrors(e) {
  return get(e, 'response.data.errors', []);
}

export default function api(config) {
  const options = {
    baseURL: API_URL,
    withCredentials: true,
    headers: {
      Authorization: Cookies.get('tok'),
    },
    ...config,
  };

  const instance = axios.create(options);

  return instance;
}
