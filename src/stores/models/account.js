import { types } from 'mobx-state-tree';
import { withStatus, withRootStore } from '../extensions';
import { MSTAddStaticMethods } from '../utils';

const Account = types
	.model('Account', {
		id: types.identifier,
		email: types.string,
		firstName: types.maybeNull(types.string),
		lastName: types.maybeNull(types.string),
		phone: types.maybeNull(types.string),
	})
	.extend(withStatus)
	.extend(withRootStore)
	.actions(self => ({}))
	.views(self => ({}));

// Attach static methods
export default MSTAddStaticMethods(Account, {
	fromResponseData: accountResponse => {
		const { first_name: firstName, last_name: lastName, ...rest } = accountResponse.data;

		return {
			firstName,
			lastName,
			...rest,
		};
	},
	toRequestData: account => {
		return {
			id: account.id,
			first_name: account.firstName,
			last_name: account.lastName,
			email: account.email,
			phone: account.phone,
		};
	},
});
