import axios from 'axios';

/**
 * Manages all requests to the API.
 */
export class BaseHttpClient {
	/**
	 * Axios instance
	 */
	client;
	/**
	 * Configurable options.
	 */
	config;

	/**
	 * Creates the api.
	 *
	 * @param config The configuration to use.
	 */
	constructor(config) {
		this.config = config;

		// construct the axios instance
		this.client = axios.create({
			baseURL: this.config.url,
			timeout: this.config.timeout ?? 10000,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
	}

	/**
	 * Passthrought any request here
	 *
	 * @type {AxiosInstance['request']}
	 * @memberof BaseHttpClient
	 */
	request = params => this.client.request(params);

	/**
	 * Wrapper for post requests
	 */
	post = (url, data, config) => this.client.request({ method: 'post', url, data, ...config });

	/**
	 * Wrapper for get requests
	 */
	get = (url, params, config) => this.client.request({ method: 'get', url, params, ...config });

	/**
	 * Wrapper for put requests
	 */
	put = (url, data, config) => this.client.request({ method: 'put', url, data, ...config });

	/**
	 * Wrapper for patch requests
	 */
	patch = (url, data, config) => this.client.request({ method: 'patch', url, data, ...config });

	/**
	 * Wrapper for delete requests
	 */
	delete = (url, config) => this.client.request({ method: 'delete', url, ...config });
}
