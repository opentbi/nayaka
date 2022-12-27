const isUrl = (url: string): boolean => {
	try {
		return !!new URL(url);
	} catch {
		return false;
	}
};
export const prohibitedFilters = async (
	urls: Array<string>,
	filters: string[],
): Promise<boolean> => {
	return await new Promise((resolve) => {
		urls = urls.filter((url) => isUrl(url))
			.map((url) => new URL(url).host);

		for (const filter of filters) {
			if (filter.startsWith('regex:')) {
				const filterSplit = filter.replace('regex:', '').split('##flag:');
				const regex = new RegExp(filterSplit[0], filterSplit[1]);
				const match = urls.find((u) => regex.test(u));
				if (match) return resolve(true);
			} else {
				const match = urls.find((u) => filter === u);
				if (match) return resolve(true);
			}
		}

		return resolve(false);
	});
};
