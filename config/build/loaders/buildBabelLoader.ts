import { BuildOptions } from '../types/config';

export function buildBabelLoader({isDev}: BuildOptions) {
	return {
		test: /\.(js|jsx|tsx)$/, // Apply babel-loader to .js, .mjs, and .cjs files
		exclude: /node_modules/, // Exclude files in node_modules to speed up compilation
		use: {
			loader: 'babel-loader',
			options: {
				// Babel options can be defined here or in a separate Babel config file (.babelrc or babel.config.js)
				presets: [
					['@babel/preset-env', { targets: 'defaults' }], // Transpile based on target environments
				],
				plugins: [
					['i18next-extract', {
						locales: ['ru', 'en'],
						keyAsDefaultValue: true,
					}],
					isDev && require.resolve('react-refresh/babel'),
				].filter(Boolean),
				cacheDirectory: true, // Enable caching for faster rebuilds
			},
		},
	};
}