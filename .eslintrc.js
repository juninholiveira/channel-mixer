module.exports = {
	"env": {
		"commonjs": true,
		"es2021": true,
		"node": true,
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/jsx-runtime",
		"plugin:yml/standard",
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true,
		},
		"ecmaVersion": "latest",
	},
	"ignorePatterns": [
		"!.*",
		"dist",
		"node_modules",
	],
	"overrides": [
		{
			"files": ["*.yaml", "*.yml"],
			"parser": "yaml-eslint-parser",
			"rules": {
				"spaced-comment": ["off"],
				"yml/spaced-comment": ["error"],
			},
		},
	],
	"settings": {
		"react": {
			"version": "detect",
		},
	},
	"plugins": [
		"react",
		"@typescript-eslint",
		"import-helpers",
	],
	"rules": {
		"indent": ["error", "tab"],
		"linebreak-style": ["error", "unix"],
		"quotes": ["error", "double"],
		"semi": ["error", "never"],
		"spaced-comment": ["error", "always"],
		"no-multiple-empty-lines": [
			"error",
			{
				"max": 1,
				"maxEOF": 0,
				"maxBOF": 0,
			},
		],
		"no-magic-numbers": [
			"error",
			{
				"ignoreArrayIndexes": true,
			},
		],

		// Array
		"array-bracket-spacing": ["error", "never"],
		"array-element-newline": [
			"error",
			{
				"multiline": true,
				"minItems": 3,
			},
		],
		"array-bracket-newline": [
			"error",
			{
				"multiline": true,
				"minItems": 3,
			},
		],

		// Comma
		"comma-dangle": ["error", "always-multiline"],
		"comma-spacing": [
			"error",
			{
				"before": false,
				"after": true,
			},
		],
		"comma-style": ["error", "last"],

		// Plugins
		"import-helpers/order-imports": [
			"error",
			{
				"newlinesBetween": "always", // new line between groups
				"groups": [
					"/^react/",
					"module",
					"/^@shared/",
					[
						"parent",
						"sibling",
						"index",
					],
				],
				"alphabetize": {
					"order": "asc",
					"ignoreCase": true,
				},
			},
		],
	},
}