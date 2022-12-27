/**
 * Copyright (c) 2022 - Nayaka Project
 * FILE INI ADALAH BAGIAN DARI NAYAKA PROJECT.
 * Nayaka merupakan Open Source Software dengan Apache License V2.
 * Anda dapat mengedit atau mendistribusikan ulang sesuai dengan syarat dan ketentuan dari Apache License.
 */
import { Grammy } from '../../deps.ts';
import * as QueryTypes from './query.ts';

export type NayakaSessionData = {
	group?: QueryTypes.Group;
};
export type NayakaContext =
	& Grammy.Context
	& Grammy.SessionFlavor<NayakaSessionData>;
