import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/testAsyncThunk';
import { validateProfileData } from './validateProfileData';
import { Country } from '../../../../Country';
import { Currency } from '../../../../Currency';
import { ValidateProfileError } from '../../types/profile';

const data = {
	username: 'admin',
	age: 22,
	country: Country.Ukraine,
	lastname: 'ulbi tv',
	first: 'asd',
	city: 'asf',
	currency: Currency.USD,
};

describe('validateProfileData.test', () => {
	test('success', async () => {
		const result = validateProfileData(data);

		expect(result).toEqual([]);
	});

	test('without first and last name', async () => {
		const result = validateProfileData({ ...data, first: '', lastname: '' });

		expect(result).toEqual([
			ValidateProfileError.INCORRECT_USER_DATA,
		]);
	});

	test('without age', async () => {
		const result = validateProfileData({ ...data, age: undefined });

		expect(result).toEqual([
			ValidateProfileError.INCORRECT_AGE,
		]);
	});

	test('incorrect country', async () => {
		const result = validateProfileData({ ...data, country: undefined });

		expect(result).toEqual([
			ValidateProfileError.INCORRECT_COUNTRY,
		]);
	});

	test('all incorrect', async () => {
		const result = validateProfileData({});

		expect(result).toEqual([
			ValidateProfileError.INCORRECT_USER_DATA,
			ValidateProfileError.INCORRECT_AGE,
			ValidateProfileError.INCORRECT_COUNTRY,
		]);
	});
});
