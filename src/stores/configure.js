import { onSnapshot } from 'mobx-state-tree';
import pick from 'lodash-es/pick';
import omit from 'lodash-es/omit';
import { RootStore } from './root-store';
import * as storage from 'utils/storage';

/**
 * The key we'll be saving our state as within async storage.
 */
const ROOT_STATE_STORAGE_KEY = 'root';

const STORE_PERSISTENCE_CONFIG = {
	whitelist: ['session'],
};

const persistStore = (config, store) => {
	if (config.whitelist) {
		return pick(store, config.whitelist);
	}

	if (config.blacklist) {
		return omit(store, config.blacklist);
	}

	return store;
};

export async function configureStore(container) {
	let rootStore;
	try {
		// load data from storage
		const data = (await storage.load(ROOT_STATE_STORAGE_KEY)) || {};

		rootStore = RootStore.create(data, container);
	} catch (e) {
		rootStore = RootStore.create({}, container);
	}

	onSnapshot(rootStore, rootStore => {
		const persistedStore = persistStore(STORE_PERSISTENCE_CONFIG, rootStore);
		storage.save(ROOT_STATE_STORAGE_KEY, persistedStore);
	});

	// Add Middlewares here
	// e.g addMiddleware(rootStore, DummyMiddleware);

	return rootStore;
}
