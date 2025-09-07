import webpack, { RuleSetRule } from 'webpack';
import {BuildPaths} from '../build/types/config';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoaders';

export default ({config}: {config: webpack.Configuration}) => {
	const paths: BuildPaths = {
		build: '',
		html: '',
		entry: '',
		src: path.resolve(__dirname, '..', '..', 'src'),
	};

	config.resolve?.modules?.push(paths.src);
	config.resolve?.extensions?.push('ts', 'tsx');

	config.module = {...config.module};
	// eslint-disable-next-line
	config.module.rules = (config.module?.rules as RuleSetRule[] || [])
		.map((rule) => {
		if (/svg/.test(rule.test as string)) {
			return {
				...rule,
				exclude: /\.svg$/i, // Also fixed the regex (see note below)
			};
		}

		return rule;
	}) || []; // Fallback to empty array if rules is undefined

	config.module.rules?.push({
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	})
	config.module.rules?.push(buildCssLoader(true));

	return config;
}