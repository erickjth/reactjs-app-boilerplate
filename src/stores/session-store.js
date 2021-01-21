import { cast, types, flow } from 'mobx-state-tree';
import { STATUSES } from 'constants/statuses';
import { SESSION_STORE_KEYS } from 'constants/session-store-keys';
import { withStatus, withServices } from './extensions';
import Account from './models/account';

const { LOGGING_IN } = SESSION_STORE_KEYS;

export const SessionStore = types
	.model('SessionStore', {
		accessToken: types.maybe(types.string),
		account: types.maybe(Account),
	})
	.extend(withStatus)
	.extend(withServices)
	.actions(self => ({
		bootstrap: flow(function* () {
			try {
				if (self.isLoggedIn) {
					const response = yield self.api.getUser();
					self.account = cast(Account.fromResponseData(response.data));
				}
			} catch (e) {
				console.log(e);
			}
		}),
		login: flow(function* (username, password) {
			try {
				self.setStatus(STATUSES.PENDING, LOGGING_IN);

				const accessTokenResponse = yield self.api.postLogin(username, password);

				self.accessToken = accessTokenResponse.data.token;

				const accountResponse = yield self.api.getUser();

				self.account = Account.create(Account.fromResponseData(accountResponse.data));

				self.setStatus(STATUSES.DONE, LOGGING_IN);
			} catch (e) {
				self.setStatus(STATUSES.ERROR, LOGGING_IN);
			}
		}),
		logout: () => {
			self.accessToken = undefined;
			self.account = undefined;
		},
	}))
	.views(self => ({
		get isLoggingIn() {
			return self.getStatus(LOGGING_IN) === STATUSES.PENDING;
		},
		get isLoggedIn() {
			return !!self.accessToken;
		},
	}));
