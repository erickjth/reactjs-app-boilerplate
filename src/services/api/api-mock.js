import MockAdapter from 'axios-mock-adapter';
import { urls } from './api-urls';
import { users } from './mocks';
import { storage } from 'utils';

export function enableMock(axios, delayResponse = 1000) {
	const mock = new MockAdapter(axios, {
		onNoMatch: 'passthrough',
		delayResponse,
	});
	const {
		auth: { postJwtCreate },
		user: { getUser },
	} = urls;

	mock.onPost(postJwtCreate.url).reply(config => {
		const { email, password } = JSON.parse(config.data);

		const user = users.find(user => user.email === email && user.password === password);

		return [user ? 200 : 401, user?.jwt];
	});

	mock.onGet(getUser.url).reply(async config => {
		const data = await storage.load('root');

		const user = users.find(({ jwt }) => jwt.token === data.session?.token?.token);
		// eslint-disable-next-line no-unused-vars
		const { jwt, ...rest } = user || {};
		return [200, rest];
	});
}
