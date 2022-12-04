/**
 * Copyright (c) 2022 - Nayaka Project
 * FILE INI ADALAH BAGIAN DARI NAYAKA PROJECT.
 * Nayaka merupakan Open Source Software dengan Apache License V2.
 * Anda dapat mengedit atau mendistribusikan ulang sesuai dengan syarat dan ketentuan dari Apache License.
 */

import { dotenvConfig } from '../deps.ts';

export const isDenoDeploy = Deno.env.get('DENO_DEPLOYMENT_ID') !== undefined;
export const getTelegramToken = () =>
	Deno.env.get('TELEGRAM_BOT_TOKEN') ||
	dotenvConfig({ safe: true }).TELEGRAM_BOT_TOKEN;