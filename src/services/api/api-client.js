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
	createJWT(email, password) {
		return this.post(urls.auth.postJwtCreate.url, {
			email,
			password,
		});
	}

	/**
	 * Performs token verification
	 *
	 * @param token
	 */
	verifyJWT(token) {
		return this.post(urls.auth.postJwtVerify.url, { token });
	}

	/**
	 * Gets the signed up user information
	 */
	getUser() {
		return this.get(urls.user.getUser.url);
	}

	/**
	 * Patches (updates) the signed up user information
	 */
	patchUser(user) {
		return this.patch(urls.user.patchUser.url, user, {
			headers: {},
		});
	}
}
