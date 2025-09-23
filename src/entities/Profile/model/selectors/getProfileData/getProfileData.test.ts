import { StateSchema } from 'app/providers/StoreProvider';
import { Currency } from '../../../../Currency';
import { Country } from '../../../../Country';
import { getProfileData } from './getProfileData';

describe('getProfileData.test', () => {
	test('should return data', () => {
		const data = {
			username: 'admin',
			age: 22,
			country: Country.Ukraine,
			lastname: 'ulbi tv',
			first: 'asd',
			city: 'asf',
			currency: Currency.USD,
		};

		const state: DeepPartial<StateSchema> = {
			profile: {
				data,
			},
		};

		expect(getProfileData(state as StateSchema)).toEqual(data);
	});

	test('should work with empty state', () => {
		const state: DeepPartial<StateSchema> = {};

		expect(getProfileData(state as StateSchema)).toEqual(undefined);
	});
});
