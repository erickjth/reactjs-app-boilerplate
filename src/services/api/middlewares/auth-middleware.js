import { isUnaunthenticateUrl } from '../api-urls';

export class AuthMiddleware {
	container;

	constructor(container) {
		this.container = container;
	}

	async onRequest(config) {
		const url = config.url ?? '';

		// Ignore those non-secured urls
		if (isUnaunthenticateUrl(url)) {
			return config;
		}

		const headerObjects = { ...config.headers };

		const rootStore = this.container.get('rootStore');

		const jwtIntance = rootStore.session.token;

		if (jwtIntance) {
			headerObjects['Authorization'] = `JWT ${jwtIntance.token}`;
		}

		return {
			...config,
			headers: headerObjects,
		};
	}

	async onResponseError(err) {
		const status = err?.response?.status;
		const config = err?.config;
		const url = config?.url ?? '';

		if (config && status === 401 && !isUnaunthenticateUrl(url)) {
			const rootStore = this.container.get('rootStore');
			rootStore.session.signOut();
		}

		throw err;
	}
}
