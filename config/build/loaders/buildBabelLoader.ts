import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin';
import { BuildOptions } from '../types/config';

interface BuildBabelLoaderProps extends BuildOptions {
	isTsx?: boolean;
}

export function buildBabelLoader({isDev, isTsx}: BuildBabelLoaderProps) {
	return {
		test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
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
					[
						'@babel/plugin-transform-typescript',
						{
							isTsx,
						},
					],
					'@babel/plugin-transform-runtime',
					isTsx &&  [
						babelRemovePropsPlugin,
						{
							props: ['data-testid'],
						},
					],
					isDev && require.resolve('react-refresh/babel'),
				].filter(Boolean),
				cacheDirectory: true, // Enable caching for faster rebuilds
			},
		},
	};
}
