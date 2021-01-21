import config from 'config';
import { createBrowserHistory } from 'history';
import { configureStore } from 'stores';
import { configureI18n } from 'i18n';
import Container from './container';
import { createApiClient } from './api';
import { createErrorReport } from './error-report';

export async function configureServices() {
	const container = new Container();

	// Error reporting
	container.register('error-report', createErrorReport());

	// Internationalization
	const i18n = await configureI18n();
	container.register('i18n', i18n);

	// Browser history
	container.register('history', createBrowserHistory());

	// Configuration as a service
	container.register('config', config);

	// API client
	container.factory('api', createApiClient);

	// Store
	const rootStore = await configureStore(container);
	container.register('rootStore', rootStore);

	return container;
}
