import { Rule } from 'eslint';

const rule: Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			description: "Require 'use server' at the top of the file",
		},
		schema: [
			{
				type: 'object',
				properties: {
					pathPattern: { type: 'string' },
				},
				additionalProperties: false,
			},
		],
		defaultOptions: [{ pathPattern: 'src/.*\\.ts$' }],
		messages: {
			missingUseServer: "{{filename}} must start with 'use server'",
		},
	},
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
