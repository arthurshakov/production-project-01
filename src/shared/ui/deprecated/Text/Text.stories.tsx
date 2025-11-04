import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Text, TextSize, TextTheme } from './Text';

export default {
	title: 'shared/Text',
	component: Text,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	title: 'Title Lorem Ipsum',
	text: 'Text description description description',
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
	title: 'Title Lorem Ipsum',
};

export const OnlyText = Template.bind({});
OnlyText.args = {
	text: 'Text description description description',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
	title: 'Title Lorem Ipsum',
	text: 'Text description description description',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = {
	title: 'Title Lorem Ipsum',
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
	text: 'Text description description description',
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Error = Template.bind({});
Error.args = {
	title: 'Title Lorem Ipsum',
	text: 'Text description description description',
	theme: TextTheme.ERROR,
};

export const SizeS = Template.bind({});
SizeS.args = {
	title: 'Title Lorem Ipsum',
	text: 'Text description description description',
	size: TextSize.S,
};

export const SizeM = Template.bind({});
SizeM.args = {
	title: 'Title Lorem Ipsum',
	text: 'Text description description description',
	size: TextSize.M,
};

export const SizeL = Template.bind({});
SizeL.args = {
	title: 'Title Lorem Ipsum',
	text: 'Text description description description',
	size: TextSize.L,
};
