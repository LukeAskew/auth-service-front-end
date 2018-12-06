import api from '../lib/api';

/**
 * Create a user
 * @param {Number} id
 * @param {String} username
 */
export async function create(data) {
  return api().post('/users', data);
}

/**
 * Set a user's username
 * @param {Number} id
 * @param {String} username
 */
export async function updateUsername(id, username) {
  return api().post('/username', { id, username });
}
