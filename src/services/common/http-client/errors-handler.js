import { HttpClientError, HttpNetworkError } from './errors';
import { isHandleable, genericMessages } from './messages';

export function configureErrorHandler(errorReportClient, customErrors) {
	return function errorHandler(error) {
		if (error?.type) {
			let message = null;
			const response = error?.response ?? null;
			if (response) {
				const { status, data } = response;
				message = isHandleable(response, customErrors);
				if (!message && status === 422) {
					// Laravel's errors processing
					const errors = data?.errors ?? {};
					message = Object.values(errors).pop() ?? message;
				}
			}

			if (!message) {
				message = genericMessages[error?.type] ?? genericMessages.generic;
			}

			if (error.type !== 'canceled' && message) {
				// alert(message);
			}
		}

		if (process.env.NODE_ENV === 'production') {
			//  Report everything that is not a client error
			if (!(error instanceof HttpNetworkError) && !(error instanceof HttpClientError)) {
				errorReportClient?.recordError(error);
			}
		} else {
			console.log(error);
		}

		return error;
	};
}
