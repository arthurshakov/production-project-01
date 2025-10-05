import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Tabs } from './Tabs';

import 'app/styles/index.scss';

export default {
	title: 'shared/Tabs',
	component: Tabs,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	tabs: [
		{
			value: '1',
			content: 'tab 1',
		},
		{
			value: '2',
			content: 'tab 2',
		},
		{
			value: '3',
			content: 'tab 3',
		},
	],
	value: '2',
	onTabClick: action('onTabClick'),
};
