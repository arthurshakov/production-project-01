import { screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import userEvent from '@testing-library/user-event';
import { $api } from 'shared/api/api';
import { EditableProfileCard } from './EditableProfileCard';
import { Currency } from '../../../../entities/Currency';
import { Country } from '../../../../entities/Country';
import { Profile } from '../../../../entities/Profile';
import { profileReducer } from '../../model/slice/profileSlice';

const profile: Profile = {
	id: '1',
	first: 'admin',
	lastname: 'admin',
	age: 465,
	currency: Currency.USD,
	country: Country.Kazakhstan,
	city: 'Moscow',
	username: 'admin213',
};

const options = {
	initialState: {
		profile: {
			readonly: true,
			data: profile,
			form: profile,
		},
		user: {
			authData: {
				id: '1',
				username: 'admin',
			},
		},
	},
	asyncReducers: {
		profile: profileReducer,
	},
};

describe('features/EditableProfileCard', () => {
	test('Readonly mode should be switched to editing mode', async () => {
		componentRender(<EditableProfileCard id="1" />, options);
		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
		expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
	});

	test('values should be restored on cancel', async () => {
		componentRender(<EditableProfileCard id="1" />, options);

		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

		await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
		await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));

		await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');
		await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user');

		expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user');
		expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user');

		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));

		expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin');
		expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin');
	});

	test('an error should appear', async () => {
		componentRender(<EditableProfileCard id="1" />, options);

		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

		await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));

		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

		expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
	});

	test('put request should happen', async () => {
		const mockPutReq = jest.spyOn($api, 'put');

		componentRender(<EditableProfileCard id="1" />, options);

		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

		await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');

		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

		expect(mockPutReq).toHaveBeenCalled();
	});
});
