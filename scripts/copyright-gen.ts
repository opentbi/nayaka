/**
 * Copyright (c) 2022 - Nayaka Project
 * FILE INI ADALAH BAGIAN DARI NAYAKA PROJECT.
 * Nayaka merupakan Open Source Software dengan Apache License V2.
 * Anda dapat mengedit atau mendistribusikan ulang sesuai dengan syarat dan ketentuan dari Apache License.
 */

import { path } from '../deps.ts';

const readCopynotice = () =>
	Deno.readTextFile(
		path.resolve(Deno.cwd(), 'scripts', 'copyright.txt'),
	);

const copyrightNoticeText = await readCopynotice();

/**
 * Write copyright text to the top contents of file
 * @param folder Folder want to inspect
 */
async function writeCopyrightNotice(folder: string) {
	try {
		const files = Deno.readDir(folder);
		for await (const file of files) {
			if (file.isDirectory) {
				writeCopyrightNotice(
					path.resolve(folder, file.name),
				);
			} else {
				if (
					!file.isSymlink &&
					(file.name.endsWith('.ts') ||
						file.name.endsWith('.js'))
				) {
					const content = await Deno.readTextFile(
						path.resolve(folder, file.name),
					);

					await Deno.writeFile(
						path.resolve(folder, file.name),
						new TextEncoder().encode(
							copyrightNoticeText
								.concat('\n')
								.concat(
									content.replace(
										copyrightNoticeText,
										'',
									)
										.trim(),
								),
						),
					);
				}
			}
		}
	} catch (e) {
		console.log('Couldn\'t write to folder:', folder, 'because', e.message);
	}
}

// Detect folders
const destinations = Deno.args.filter(
	(arg) => isNaN(parseInt(arg)) && !['.git'].includes(arg),
);

if (!destinations.length) {
	throw new Error('Missing folder destinations!');
} else if (destinations.at(0) === '.') {
	destinations[0] = Deno.cwd();
}

await Promise.all(destinations.map(
	(destination) => writeCopyrightNotice(destination),
));