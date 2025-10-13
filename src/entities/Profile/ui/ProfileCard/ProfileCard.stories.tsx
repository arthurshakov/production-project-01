import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import 'app/styles/index.scss';
import avatar from 'shared/assets/tests/storybook.jpg';
import { Country } from '../../../../entities/Country';
import { Currency } from '../../../../entities/Currency';
import { ProfileCard } from './ProfileCard';

export default {
	title: 'entities/Profile/ProfileCard',
	component: ProfileCard,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	data: {
		username: 'admin',
		age: 22,
		country: Country.Ukraine,
		lastname: 'ulbi tv',
		first: 'asd',
		city: 'asf',
		currency: Currency.USD,
		avatar,
	},
};

export const withError = Template.bind({});
withError.args = {
	error: 'true',
};

export const Loading = Template.bind({});
Loading.args = {
	isLoading: true,
};
