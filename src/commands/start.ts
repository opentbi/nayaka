/**
 * Copyright (c) 2022 - Nayaka Project
 * FILE INI ADALAH BAGIAN DARI NAYAKA PROJECT.
 * Nayaka merupakan Open Source Software dengan Apache License V2.
 * Anda dapat mengedit atau mendistribusikan ulang sesuai dengan syarat dan ketentuan dari Apache License.
 */

import { Grammy } from '../../deps.ts';
import { replacer } from '../util.ts';

const composer = new Grammy.Composer();
const text =
	'Hai {{full-name}}, saya adalah nayaka.\nSaya dapat membantu anda untuk memfilter kata, tautan, dan tagar pada grup anda dengan beberapa aturan yang dapat anda buat.\nSilakan tambahkan saya kegrup anda, dan jadikan saya administrator agar saya dapat bekerja dengan baik.\n\nDijalankan dengan Deno v{{deno-version}}';

composer.command('start', async (ctx) => {
	if (ctx.chat.type !== 'private') return;
	await ctx.reply(
		replacer(text, {
			'{{full-name}}': ctx.from.last_name
				? `${ctx.from.first_name} ${ctx.from.last_name}`
				: ctx.from.first_name,
			'{{deno-version}}': Deno.version.deno,
		}),
		{
			reply_markup: new Grammy.InlineKeyboard()
				.url('Tambahkan ke grup', `https://t.me/${ctx.me.username}?startgroup`)
				.row()
				.url('Sumber Terbuka', 'https://github.com/opentbi/nayaka')
				.url('TBI Organisasi', 'https://github.com/telegrambotindonesia'),
		},
	);
});

export default composer;
