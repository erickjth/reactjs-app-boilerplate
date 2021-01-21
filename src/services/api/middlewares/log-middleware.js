export class LogMiddleware {
	async onRequest(config) {
		console.log('REQUEST', config);

		if (config.data instanceof FormData) {
			const formDataEntries = {};
			config.data.forEach((value, key) => (formDataEntries[key] = value));
			console.log('FORM DATA', formDataEntries);
		}

		return config;
	}

	async onResponse(response) {
		console.log('RESPONSE', response);
		return response;
	}
}
