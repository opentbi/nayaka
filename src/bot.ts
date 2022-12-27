/**
 * Copyright (c) 2022 - Nayaka Project
 * FILE INI ADALAH BAGIAN DARI NAYAKA PROJECT.
 * Nayaka merupakan Open Source Software dengan Apache License V2.
 * Anda dapat mengedit atau mendistribusikan ulang sesuai dengan syarat dan ketentuan dari Apache License.
 */

import { Grammy, path } from '../deps.ts';
import type { IConfig } from './types/config.ts';
import type { NayakaContext, NayakaSessionData } from './types/grammy.ts';
import {
	getTelegramToken,
	readEntities,
	readYamlConfig,
	replacer,
} from './util.ts';
import * as commands from './commands/index.ts';

import { groupSessionMiddleware } from './middlewares/group-session.ts';

import { prohibitedFilters } from './filters/link-filter.ts';

export const bot = new Grammy.Bot<NayakaContext>(getTelegramToken());

bot.use(Grammy.session({
	initial: (): NayakaSessionData => ({ group: undefined }),
}));
bot.use(groupSessionMiddleware);
bot.on(
	['message::mention', 'message::url', 'message:forward_date', 'msg::hashtag'],
	async (ctx) => {
		const config = await readYamlConfig<IConfig>(
			path.resolve(Deno.cwd(), 'config.yaml'),
		);
		const isAppliedGroup =
			config?.appliedGroupsConfig.indexOf(ctx.chat.id) != -1;

		const targets = readEntities(ctx, [
			'url',
			'mention',
			'text_mention',
			'text_link',
			'hashtag',
		]);
		await ctx.reply(`\`\`\`${JSON.stringify(targets)}\`\`\``, {
			parse_mode: 'Markdown',
		});

		if (isAppliedGroup) {
			if (config?.features.prohibitedLinks?.enabled) {
				const containProhibited = await prohibitedFilters(
					targets,
					config.features.prohibitedLinks.links,
				);
				if (containProhibited) {
					if (config.features.prohibitedLinks.sendToGroup) {
						await ctx.reply(replacer(config.customMessages.prohibitedLinks, {
							'{{user}}': ctx.from?.username || ctx.from?.first_name!,
						}));
					}
					switch (config.features.prohibitedLinks.action) {
						case 'delete':
							await ctx.deleteMessage().catch(() => {});
							break;
						case 'ignore':
							break;
						case 'kick':
							await ctx.banAuthor({
								'revoke_messages': true,
							}).catch(() => {});
							break;
					}
				}
			}

			// soon...
		}
	},
);

for (const [key, value] of Object.entries(commands)) {
	if (value instanceof Grammy.Composer) {
		console.log('Loaded module:', key);
		bot.use(value.middleware());
	}
}
