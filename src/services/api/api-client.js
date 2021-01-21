import { urls } from './api-urls';
import { BaseHttpClient } from '../common/http-client/base-http-client';

/**
/**
 * Manages all requests to the API.
 */
export class ApiClient extends BaseHttpClient {
	/**
	 * Perform sign in action
	 *
	 * @param email
	 * @param password
	 */
	postLogin(email, password) {
		return this.post(urls.auth.postLogin.url, {
			email,
			password,
		});
	}

	/**
	 * Performs token verification
	 *
	 * @param token
	 */
	verifyLogin(token) {
		return this.post(urls.auth.postVerify.url, { token });
	}

	/**
	 * Gets the signed up user information
	 */
	getUser() {
		return this.get(urls.user.getUser.url);
	}
}
