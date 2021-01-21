import { getEnv } from 'mobx-state-tree';

/**
 * Adds a environment property to the node for accessing our
 * Environment in strongly typed.
 */
export const withServices = self => ({
	views: {
		/**
		 * The environment.
		 */
		get services() {
			return getEnv(self);
		},
		// shortcut to the api
		get api() {
			return getEnv(self).get('api');
		},
	},
});
