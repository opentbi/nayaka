/**
 * Copyright (c) 2022 - Nayaka Project
 * FILE INI ADALAH BAGIAN DARI NAYAKA PROJECT.
 * Nayaka merupakan Open Source Software dengan Apache License V2.
 * Anda dapat mengedit atau mendistribusikan ulang sesuai dengan syarat dan ketentuan dari Apache License.
 */
import type { Grammy } from '../../deps.ts';
import { sendFaunaQuery } from '../database/fauna.ts';
import type { NayakaContext, NayakaSessionData } from '../types/grammy.ts';

export const groupSessionMiddleware: Grammy.Middleware<NayakaContext> = async (
	ctx,
	next,
) => {
	const data = await sendFaunaQuery<{
		id: string;
	}, {
		group: NayakaSessionData['group'];
	}>(
		`
		query($id: String!) {
			group: findGroupById(id: $id) {
				id
			}
		}
	`,
		{ id: ctx.chat!.id.toString() },
	);

	if (!data.group) {
		await sendFaunaQuery<{ id: string }, { group: { id: string } }>(
			`
			mutation($id: String!) {
				group: createGroup(data: { id: $id }) {
					id
				}
			}
		`,
			{ id: ctx.chat!.id.toString() },
		);
	}

	ctx.session.group = data.group;
	return next();
};
