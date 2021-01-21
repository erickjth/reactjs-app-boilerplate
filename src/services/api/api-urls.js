/**
 * List of API urls.
 * By default, all are considered secure unless it is explicity set with `secure: false`
 */
export const urls = {
	auth: {
		postLogin: {
			url: '/auth/login',
			/**
			 * Takes a set of user credentials and returns a sliding JSON web token to
			 * prove the authentication of those credentials.
			 *
			 * Request POST { email: string, password: string }
			 * Returns [201, { email: string, password: string }]
			 */
		},
		postVerify: {
			url: '/auth/verify',
			/**
			 * Takes a token and indicates if it is valid. This view provides no
			 * information about a token's fitness for a particular use.
			 *
			 * Request POST { token: string }
			 * Returns [201, { token: string }]
			 */
		},
	},
	user: {
		getUser: {
			url: '/auth/users/me',
			/**
			 * Returns current user
			 *
			 * Request GET
			 * Returns [200, { User }]
			 * */
		},
	},
};

const unauthenticatedUrls = [urls.auth.postLogin, urls.auth.postVerify];

const checkUrlsCache = {};

export const isUnaunthenticateUrl = path => {
	if (checkUrlsCache[path] === undefined) {
		const result = unauthenticatedUrls.some(entry => {
			return entry.url === path || (entry.regex && entry.regex.test(path));
		});

		// Save the result in cache to avoid computing multiple times, it should never change
		checkUrlsCache[path] = result;
	}

	return checkUrlsCache[path];
};
