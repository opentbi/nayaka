/**
 * Copyright (c) 2022 - Nayaka Project
 * FILE INI ADALAH BAGIAN DARI NAYAKA PROJECT.
 * Nayaka merupakan Open Source Software dengan Apache License V2.
 * Anda dapat mengedit atau mendistribusikan ulang sesuai dengan syarat dan ketentuan dari Apache License.
 */

import { Grammy } from '../deps.ts';
import { getTelegramToken } from './util.ts';

import { commonsComposer } from './commands/commons.ts';

export const bot = new Grammy.Bot(getTelegramToken());
bot.use((ctx,next)=>{
  console.log("Update :",ctx)
  return next()
})
// bot.use(commonsComposer.middleware());
