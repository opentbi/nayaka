/**
 * Copyright (c) 2022 - Nayaka Project
 * FILE INI ADALAH BAGIAN DARI NAYAKA PROJECT.
 * Nayaka merupakan Open Source Software dengan Apache License V2.
 * Anda dapat mengedit atau mendistribusikan ulang sesuai dengan syarat dan ketentuan dari Apache License.
 */

interface Feature {
	prohibitedLinks: {
		enabled: boolean;
		sendToGroup: boolean;
		action: 'delete' | 'ignore' | 'kick';
		links: string[];
	};
	prohibitedWords: Omit<Feature['prohibitedLinks'], 'links'> & {
		words: string[];
	};
	noGroupPromotions:
		& Omit<Feature['prohibitedLinks'], 'links' | 'sendToGroup'>
		& {
			tags: boolean;
			links: boolean;
			messageEnabled: boolean;
			bypassHashtags: string[];
		};
}
export interface IConfig {
	developers: string[];
	customMessages: Record<string, string>;
	features: Feature;
	appliedGroupsConfig: number[];
}
