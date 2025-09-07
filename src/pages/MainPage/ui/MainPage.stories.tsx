import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MainPage from './MainPage';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

export default {
	title: 'pages/MainPage',
	component: MainPage,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof MainPage>;

type MainPageProps = React.ComponentProps<typeof MainPage>;

const Template: ComponentStory<typeof MainPage> = (args: MainPageProps) => <MainPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Normal.decorators = [ThemeDecorator(Theme.DARK)];
