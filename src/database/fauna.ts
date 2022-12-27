/**
 * Copyright (c) 2022 - Nayaka Project
 * FILE INI ADALAH BAGIAN DARI NAYAKA PROJECT.
 * Nayaka merupakan Open Source Software dengan Apache License V2.
 * Anda dapat mengedit atau mendistribusikan ulang sesuai dengan syarat dan ketentuan dari Apache License.
 */
import { getFaunaSecret } from '../util.ts';

export const sendFaunaQuery = async <B, V>(
	query: string,
	variables: B,
): Promise<V> => {
	const secret = getFaunaSecret();
	if (!secret) throw new TypeError('Missing FAUNADB_SECRET');

	const response = await fetch('https://graphql.fauna.com/graphql', {
		method: 'POST',
		headers: {
			'Authorization': 'Bearer ' + secret,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ query, variables }),
	});

	const { data, errors } = await response.json();
	if (errors) throw new Error(JSON.stringify(errors));
	else return data;
};
