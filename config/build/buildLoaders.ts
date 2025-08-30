import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { BuildOptions } from './types/config';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
	const svgLoader = {
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	};

	const fileLoader = {
		test: /\.(png|jpe?g|gif|woff|woff2)$/i,
		use: [
			{
				loader: 'file-loader',
			},
		],
	};

	const typescriptLoader = {
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/,
	};

	const cssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			// 'style-loader',  // Injects CSS into the DOM via <style> tags
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			// 'css-loader',    // Interprets @import, url() etc.
			{
				loader: 'css-loader',
				options: {
					modules: {
						auto: (resPath: string) => Boolean(resPath.includes('.module.')),
						localIdentName: isDev
							? '[path][name]__[local]--[hash:base64:5]'
							: '[hash:base64:8]',
					},
				},
			},
			'sass-loader', // Interprets @import, url() etc.
		],
	};

	const babelLoader = {
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
				],
				cacheDirectory: true, // Enable caching for faster rebuilds
			},
		},
	};

	return [
		babelLoader,
		typescriptLoader,
		cssLoader,
		fileLoader,
		svgLoader,
	];
}
