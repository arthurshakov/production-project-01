import { LoginSchema } from 'features/AuthByUserName';
import { CounterSchema } from '../../../../entities/Counter';
import { UserSchema } from '../../../../entities/User';

export interface StateSchema {
	counter: CounterSchema;
	user: UserSchema;
	loginForm: LoginSchema;
}
