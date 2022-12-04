/**
 * Copyright (c) 2022 - Nayaka Project
 * FILE INI ADALAH BAGIAN DARI NAYAKA PROJECT.
 * Nayaka merupakan Open Source Software dengan Apache License V2.
 * Anda dapat mengedit atau mendistribusikan ulang sesuai dengan syarat dan ketentuan dari Apache License.
 */

import { Grammy } from '../deps.ts';
import { getTelegramToken } from './util.ts';

export const bot = new Grammy.Bot(getTelegramToken());

bot.command(['start', 'help'], async (ctx) => {
	await ctx.reply(`This bot is running on Deno v${Deno.version.deno}`, {
		reply_markup: new Grammy.InlineKeyboard()
			.url('Repository', 'https://github.com/opentbi/nayaka')
			.url('TBI Organization', 'https://github.com/telegrambotindonesia'),
	});
});
