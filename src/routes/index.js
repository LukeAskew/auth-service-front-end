import React from 'react';
import { Redirect } from 'react-router-dom';
import auth from './auth';
import users from './users';

export default [
  {
    path: '/',
    component: () => React.createElement(Redirect, { to: '/account' })
  },
  ...auth,
  ...users
];
