import { Rule } from 'eslint';

const rule: Rule.RuleModule = {
	create: context => {
		const options = context.options[0] || {};
		const pathPattern = options.pathPattern || 'src/.*\\.ts$';
		const filename = context.filename;
		if (!new RegExp(pathPattern).test(filename)) return {};

		return {
			Program(node) {
				const sourceCode = context.sourceCode;
				const lines = sourceCode.getText().split(/\r?\n/);
				const firstLine = lines[0] ?? '';

				if (!firstLine.startsWith("'use server'")) {
					context.report({
						node,
						messageId: 'missingUseServer',
						data: { filename },
					});
				}
			},
		};
	},
};

export = rule;
