module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'react',
		'@typescript-eslint',
	],
	rules: {
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-indent-props': ['error', 'tab'],
		allowIndentationTabs: 'off',
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
		'import/prefer-default-export': 'off',
		'no-unused-vars': 'warn',
		'react/require-default-props': 'off',
		'import/no-extraneous-dependencies': 'off',
		'no-tabs': 'off',
		'import/no-unresolved': 'off',
		'import/extensions': 'off',
		'react/function-component-definition': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/jsx-props-no-spreading': 'warn',
		'no-shadow': 'off',
		'no-underscore-dangle': 'off',
		'max-len': 'off',
	},
	globals: {
		__IS_DEV__: true,
	}
};
