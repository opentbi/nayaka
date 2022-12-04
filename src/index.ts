/**
 * Copyright (c) 2022 - Nayaka Project
 * FILE INI ADALAH BAGIAN DARI NAYAKA PROJECT.
 * Nayaka merupakan Open Source Software dengan Apache License V2.
 * Anda dapat mengedit atau mendistribusikan ulang sesuai dengan syarat dan ketentuan dari Apache License.
*/

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
