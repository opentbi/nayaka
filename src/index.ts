import {type EnvironmentVariables} from './types';

export default {
	async fetch(
		request: Request,
		env: EnvironmentVariables,
		ctx: ExecutionContext,
	): Promise<Response> {
		return new Response('Hello World!');
	},
};
