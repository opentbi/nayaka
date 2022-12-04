/**
* Copyright (c) 2022 - Nayaka Project
* FILE INI ADALAH BAGIAN DARI NAYAKA PROJECT.
* Nayaka merupakan Open Source Software dengan Apache License V2.
* Anda dapat mengedit atau mendistribusikan ulang sesuai dengan syarat dan ketentuan dari Apache License.
*/
import { serveHttp, webhookCallback } from './deps.ts';
import { bot } from './src/bot.ts';
import { isDenoDeploy } from './src/util.ts';

if (isDenoDeploy) {
	serveHttp(async (request) => {
		if (request.method === 'POST') {
			const url = new URL(request.url);

			if (url.pathname.slice(1) === bot.token) {
				try {
					return await webhookCallback(bot, 'std/http')(request);
				} catch (err) {
					console.error(err);
				}
			}
		}

		return new Response();
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