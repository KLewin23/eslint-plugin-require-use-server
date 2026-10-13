import type { ESLint } from 'eslint';
import { requireUseServer } from './require-use-server';

const { name, version } =
	// `import`ing here would bypass the TSConfig's `"rootDir": "src"`
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	require('../package.json') as typeof import('../package.json');

const plugin: ESLint.Plugin = {
	meta: {
		name,
		version,
		namespace: 'require-use-server'
	},
	rules: {
		'require-use-server': requireUseServer,
	},
};

export = plugin;
