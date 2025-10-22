module.exports = {
	stories: [
		// '../../src/**/*.stories.mdx',
		'../../src/**/*.stories.@(js|jsx|ts|tsx)',
	],
	addons: [
		'@storybook/addon-links',
		{
			name: '@storybook/addon-essentials',
			options: {
				backgrounds: false,
			},
		},
		'@storybook/addon-interactions',
		'storybook-addon-mock/register',
		'storybook-addon-themes',
	],
	framework: '@storybook/react',
	core: {
		builder: '@storybook/builder-webpack5',
		// builder: 'webpack5',
	},
	webpackFinal: async (config) => {
		// 👇 Resolve 'entities' to your local src/entities folder
		config.resolve.preferAbsolute = true;
		// config.resolve.alias = {
		// 	...config.resolve.alias,
		// 	entities: `${__dirname}/../../../src/entities`,
		// 	User: `${__dirname}/../../../src/entities/User/index`,
		// 	Counter: `${__dirname}/../../../src/entities/Counter/index`,
		// };

		return config;
	},
};
