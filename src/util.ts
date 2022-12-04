/**
 * Copyright (c) 2022 - Nayaka Project
 * FILE INI ADALAH BAGIAN DARI NAYAKA PROJECT.
 * Nayaka merupakan Open Source Software dengan Apache License V2.
 * Anda dapat mengedit atau mendistribusikan ulang sesuai dengan syarat dan ketentuan dari Apache License.
 */

import { dotenvConfig } from '../deps.ts';

export const isDenoDeploy = Deno.env.get('DENO_DEPLOYMENT_ID') !== undefined;

export const getSecretToken = () =>
	Deno.env.get('WEBHOOK_SECRET') ||
	dotenvConfig({ safe: true }).WEBHOOK_SECRET;

export const getTelegramToken = () =>
	Deno.env.get('TELEGRAM_BOT_TOKEN') ||
	dotenvConfig({ safe: true }).TELEGRAM_BOT_TOKEN;

export function replacer(
	text: string,
	replace: Record<string, string>,
): string {
	for (const [key, value] of Object.entries(replace)) {
		text = text.replace(new RegExp(key, 'gm'), value);
	}
	return text;
}
