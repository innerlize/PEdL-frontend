import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import pluginQuery from '@tanstack/eslint-plugin-query';

export default [
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	{ languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	...pluginQuery.configs['flat/recommended'],
	pluginReactConfig,
	{ settings: { react: { version: 'detect' } } },
	{
		rules: { 'react/react-in-jsx-scope': 0, 'react/prop-types': 0 }
	}
];
