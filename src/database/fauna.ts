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
	if (errors) throw new Error(errors[0]);
	else return data;
};
