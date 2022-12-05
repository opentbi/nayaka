/**
 * Copyright (c) 2022 - Nayaka Project
 * FILE INI ADALAH BAGIAN DARI NAYAKA PROJECT.
 * Nayaka merupakan Open Source Software dengan Apache License V2.
 * Anda dapat mengedit atau mendistribusikan ulang sesuai dengan syarat dan ketentuan dari Apache License.
 */

import { Grammy } from '../../deps.ts';
import { replacer } from '../util.ts';

const help = new Grammy.Composer();
const text =
	'Hai {{full-name}}, Berikut adalah beberapa bantuan yang tersedia.';

help.command('help', async (ctx) => {
	if (ctx.chat.type !== 'private') return;
	await ctx.reply(
		replacer(text, {
			'{{full-name}}': ctx.from?.last_name
				? `${ctx.from.first_name} ${ctx.from.last_name}`
				: ctx.from?.first_name!,
		}),
	);
});
export default help;
