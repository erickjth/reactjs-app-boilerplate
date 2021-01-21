import { cast, types, flow } from 'mobx-state-tree';
import { STATUSES } from 'constants/statuses';
import { withStatus, withServices } from './extensions';
import Account from './models/account';

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
					const response = yield self.api.getAccount('me');
					self.account = cast(Account.fromResponseData(response.data));
				}
			} catch (e) {
				console.log(e);
			}
		}),
		login: flow(function* (username, password) {
			try {
				self.setStatus(STATUSES.PENDING, 'loggingIn');

				const accessTokenResponse = yield self.api.postLogin(username, password);

				self.accessToken = accessTokenResponse.data.data.token;

				const accountResponse = yield self.api.getAccount('me');

				self.account = Account.create(Account.fromResponseData(accountResponse.data));

				self.setStatus(STATUSES.DONE, 'loggingIn');
			} catch (e) {
				self.setStatus(STATUSES.ERROR, 'loggingIn');
			}
		}),
		logout: () => {
			self.accessToken = undefined;
			self.account = undefined;
		},
	}))
	.views(self => ({
		get isLoggingIn() {
			return self.getStatus('loggingIn') === STATUSES.PENDING;
		},
		get isLoggedIn() {
			return !!self.accessToken;
		},
	}));
