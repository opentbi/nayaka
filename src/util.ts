/**
 * Copyright (c) 2022 - Nayaka Project
 * FILE INI ADALAH BAGIAN DARI NAYAKA PROJECT.
 * Nayaka merupakan Open Source Software dengan Apache License V2.
 * Anda dapat mengedit atau mendistribusikan ulang sesuai dengan syarat dan ketentuan dari Apache License.
 */

import { dotenvConfig, Grammy, GrammyTypes, YAML } from '../deps.ts';

export const isDenoDeploy = Deno.env.get('DENO_DEPLOYMENT_ID') !== undefined;

export const getSecretToken = () =>
	Deno.env.get('WEBHOOK_SECRET') ||
	dotenvConfig({ safe: true }).WEBHOOK_SECRET;
export const getFaunaSecret = (): string =>
	Deno.env.get('FAUNADB_SECRET') ||
	dotenvConfig({ safe: true }).FAUNADB_SECRET;
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

export const readYamlConfig = async <T>(path: string) => {
	const contents = await Deno.readTextFile(path);

	try {
		return YAML.parse(contents, {
			json: true,
		}) as T;
	} catch {
		return undefined;
	}
};

export const readEntities = (
	ctx: Grammy.Context,
	type: GrammyTypes.MessageEntity['type'][],
): string[] => {
	let targets: string[] = [];

	const userEntity = (user: GrammyTypes.User): string => {
		return user.username
			? `https://t.me/${user.username}`
			: 'tg://user?id=' + user.id;
	};
	const parseEntities = (str: string, ents: GrammyTypes.MessageEntity[]) => {
		ents = ents.filter((e) =>
			type.indexOf(e.type) != -1 && ('user' in e ? !e.user.is_bot : true)
		);
		return ents.map((e) =>
			'url' in e
				? 'dom:' + new URL(e.url).host
				: 'user' in e
				? userEntity(e.user)
				: str.slice(e.offset, e.offset + e.length)
		);
	};

	if (ctx.msg?.caption && ctx.msg?.caption_entities) {
		targets = parseEntities(ctx.msg.caption, ctx.msg.caption_entities);
	} else if (ctx.msg?.text && ctx.msg?.entities) {
		targets = parseEntities(ctx.msg.text, ctx.msg.entities);
	}

	return targets;
};
