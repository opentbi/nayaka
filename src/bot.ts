/**
* Copyright (c) 2022 - Nayaka Project
* FILE INI ADALAH BAGIAN DARI NAYAKA PROJECT.
* Nayaka merupakan Open Source Software dengan Apache License V2.
* Anda dapat mengedit atau mendistribusikan ulang sesuai dengan syarat dan ketentuan dari Apache License.
*/
import { Bot } from '../deps.ts';
import { getTelegramToken } from './util.ts';

export const bot = new Bot(getTelegramToken());