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
		console.log('Loaded module:', key);
		bot.use(value.middleware());
	}
}
