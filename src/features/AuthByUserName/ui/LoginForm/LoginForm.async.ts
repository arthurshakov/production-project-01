import { FC, lazy } from 'react';
import { LoginFormProps } from './LoginForm';

// export const LoginFormAsync = lazy<FC<LoginFormProps>>(() => {
// 	return new Promise((resolve) => {
// 		setTimeout(() => resolve(import('./LoginForm')), 1500);
// 	});
// });
export const LoginFormAsync = lazy<FC<LoginFormProps>>(
  () => import('./LoginForm'),
);
