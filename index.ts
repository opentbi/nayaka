/**
 * Copyright (c) 2022 - Nayaka Project
 * FILE INI ADALAH BAGIAN DARI NAYAKA PROJECT.
 * Nayaka merupakan Open Source Software dengan Apache License V2.
 * Anda dapat mengedit atau mendistribusikan ulang sesuai dengan syarat dan ketentuan dari Apache License.
 */

import { Grammy, serveHttp } from './deps.ts';
import { bot } from './src/bot.ts';
import { getSecretToken, isDenoDeploy } from './src/util.ts';

const secretKey = getSecretToken();

if (isDenoDeploy) {
	if (!secretKey) throw new Error('WEBHOOK_SECRET is needed!');
	serveHttp(async (request) => {
		if (request.method === 'POST') {
			const secretRequest = request.headers.get(
				'X-Telegram-Bot-Api-Secret-Token',
			);

			if (secretRequest !== secretKey) {
				return new Response('verify fail', { status: 403 });
			}

			return await Grammy.webhookCallback(bot, 'std/http')(request);
		}

		return new Response('seems good');
	});
} else {
	await bot.init();

	console.log(
		'Started as:',
		bot.botInfo.username,
	);
	bot.start({
		drop_pending_updates: true,
	});
}
