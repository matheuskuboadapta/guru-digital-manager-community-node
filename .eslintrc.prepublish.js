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
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/explicit-function-return-type': 'error',
		'@typescript-eslint/explicit-module-boundary-types': 'error',
		'@typescript-eslint/no-explicit-any': 'error',
		'eslint-plugin-n8n-nodes-base/node-param-default-missing': 'error',
		'eslint-plugin-n8n-nodes-base/node-param-description-unneeded-backticks': 'error',
	},
	env: {
		node: true,
		es6: true,
	},
};
