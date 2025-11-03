import { loginActions, loginReducer } from './loginSlice';
import { LoginSchema } from '../types/LoginSchema';

describe('loginSlice.test', () => {
	test('test set username', () => {
		const state: DeepPartial<LoginSchema> = { username: 'username' };
		expect(
			loginReducer(
				state as LoginSchema,
				loginActions.setUsername('username-2'),
			),
		).toEqual({ username: 'username-2' });
	});

	test('test set password', () => {
		const state: DeepPartial<LoginSchema> = { password: 'password' };

		expect(
			loginReducer(
				state as LoginSchema,
				loginActions.setPassword('password-2'),
			),
		).toEqual({ password: 'password-2' });
	});
});
