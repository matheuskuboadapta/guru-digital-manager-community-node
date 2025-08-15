module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		project: './tsconfig.json',
	},
	plugins: ['@typescript-eslint', 'eslint-plugin-n8n-nodes-base'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:eslint-plugin-n8n-nodes-base/recommended',
	],
	rules: {
		'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'warn',
		'eslint-plugin-n8n-nodes-base/node-param-default-missing': 'off',
		'eslint-plugin-n8n-nodes-base/node-param-description-unneeded-backticks': 'off',
	},
	env: {
		node: true,
		es6: true,
	},
};
