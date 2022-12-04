/**
 * Copyright (c) 2022 - Nayaka Project
 * FILE INI ADALAH BAGIAN DARI NAYAKA PROJECT.
 * Nayaka merupakan Open Source Software dengan Apache License V2.
 * Anda dapat mengedit atau mendistribusikan ulang sesuai dengan syarat dan ketentuan dari Apache License.
 */

export { config as dotenvConfig } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts';
export {
	Bot,
	webhookCallback,
} from 'https://deno.land/x/grammy@v1.12.0/mod.ts';
export { serve as serveHttp } from 'https://deno.land/std@0.167.0/http/server.ts';
export * as path from 'https://deno.land/std@0.102.0/path/mod.ts';