import { types, flow } from 'mobx-state-tree';
import { SessionStore } from './session-store';

export const RootStore = types
	.model('RootStore', {
		session: types.optional(SessionStore, {}),
	})
	.actions(self => ({
		bootstrap: flow(function* () {
			try {
				yield self.session.bootstrap();
				// Add more bootstrap function here from other stores
			} catch (e) {
				console.log(e);
			}
		}),
	}));
