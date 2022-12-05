/**
 * Copyright (c) 2022 - Nayaka Project
 * FILE INI ADALAH BAGIAN DARI NAYAKA PROJECT.
 * Nayaka merupakan Open Source Software dengan Apache License V2.
 * Anda dapat mengedit atau mendistribusikan ulang sesuai dengan syarat dan ketentuan dari Apache License.
 */

import { Grammy } from '../deps.ts';
import { getTelegramToken } from './util.ts';
import * as commands from './commands/index.ts';

export const bot = new Grammy.Bot(getTelegramToken());

for (const [key, value] of Object.entries(commands)) {
	if (value instanceof Grammy.Composer) {
		console.log('Loaded ', key, ' module');
		bot.use((value as Grammy.Composer).middleware());
	}
}
/*for await (const file of Deno.readDir('./src/commands')) {
	if (file.isFile && /\.(ts|js)$/.test(file.name)) {
		try {
			const composer = await import('./' + path.join('commands', file.name));
			console.log("Dectect module",composer)
			if (composer.default && composer.default instanceof Grammy.Composer) {
			  console.log("Is Composer")
			  composer.default as Grammy.Composer;
				bot.use(composer.default.middleware());
			}
		} catch {
			continue;
		}
	}
}*/