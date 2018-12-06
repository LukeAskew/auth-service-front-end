import { lazy } from 'react';

export default [
  {
    path: '/login',
    component: lazy(() => import('../pages/auth/Login')),
    unprotected: true,
  },
  {
    path: '/signup',
    component: lazy(() => import('../pages/auth/SignUp')),
    unprotected: true,
  },
];
