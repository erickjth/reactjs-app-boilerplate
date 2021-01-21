import { Service } from 'axios-middleware';
import { ApiClient } from './api-client';
import { ErrorHandlerMiddleware, AuthMiddleware, LogMiddleware } from './middlewares';
import { enableMock } from './api-mock';
import { configureErrorHandler } from '../common/http-client/errors-handler';

export function createApiClient(container) {
	const config = container.get('config');
	const errorReportClient = container.get('error-report');

	const errorHandler = configureErrorHandler(errorReportClient);

	const apiSettings = config.api;

	const api = new ApiClient(apiSettings);

	// Config mock if need it
	if (apiSettings.useMock) {
		enableMock(api.client, apiSettings.mockResponseDelay);
	}

	// Configure middlewares
	new Service(api.client).register([
		...(apiSettings.logEnabled ? [new LogMiddleware()] : []),
		new AuthMiddleware(container),
		new ErrorHandlerMiddleware(errorHandler),
	]);

	return api;
}
