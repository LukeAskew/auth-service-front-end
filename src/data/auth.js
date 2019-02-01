import Cookies from 'js-cookie';
import api from '../lib/api';

/**
 * Get user account
 * @returns {Object}
 */
export async function getAccount() {
  return api().get('/account');
}

/**
 * Verify that a user is authenticated by
 * checking for token cookie, then by attempting
 * to fetch their account.
 * @returns {Object}
 */
export async function checkAuthentication() {
  if (!Cookies.get('tok')) {
    return Promise.reject();
  }

  return getAccount();
}

/**
 * Authenticate a user
 * @param {Object} data
 * @returns {Object}
 */
export async function login(data) {
  const session = await api().post('/login', data);

  // Save token as cookie
  Cookies.set('tok', session.data.token, { expires: 90 });

  return session;
}

/**
 * Refresh user session
 * @returns {Object}
 */
export async function refreshSession() {
  return api().post('/refresh');
}

/**
 * Logout user
 * @returns {Object}
 */
export async function logout() {
  await api().get('/logout');

  Cookies.remove('tok');
}
