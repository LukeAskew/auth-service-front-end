import React from 'react';
import dayjs from 'dayjs';
import { routeTo } from '../../lib/history';
import Header from '../../components/layout/Header';
import { logout } from '../../data/auth';

/**
 * Handle logout.
 * Revoke token and route to login page.
 * @param {Object} e Event
 */
async function handleLogout(e) {
  await logout();
  routeTo('/login');
}

const Account = props => (
  <div>
    <Header
      onLogout={handleLogout}
    />

    <h1>{`Hello, ${props.account.name}!`}</h1>

    <h2>{`@${props.account.username}`}</h2>

    <div>{`Last Login: ${dayjs(props.account.last_login).format('MMMM D, YYYY @ h:mm A')}`}</div>
  </div>
);

export default Account;
