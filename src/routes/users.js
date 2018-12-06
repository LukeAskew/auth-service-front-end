import { lazy } from 'react';

export default [
  {
    path: '/account',
    component: lazy(() => import('../pages/users/Account.jsx')),
  },
];
