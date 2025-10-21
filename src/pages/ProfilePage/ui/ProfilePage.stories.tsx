import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import avatar from '@/shared/assets/tests/storybook.jpg';
import { Theme } from '@/shared/const/theme';
import { Country } from '../../../entities/Country';
import { Currency } from '../../../entities/Currency';
import ProfilePage from './ProfilePage';

export default {
	title: 'pages/ProfilePage/ProfilePage',
	component: ProfilePage,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;

const storeDecoratorData = {
	profile: {
		form: {
			username: 'admin',
			age: 22,
			country: Country.Ukraine,
			lastname: 'ulbi tv',
			first: 'asd',
			city: 'asf',
			currency: Currency.USD,
			avatar,
		},
	},
};

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator(storeDecoratorData)];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator(storeDecoratorData)];
