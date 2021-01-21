import axios from 'axios';

export class BaseHttpError extends Error {
	type;
	response;
	originalError;
	remoteMessage;

	constructor(type, message, remoteMessage) {
		super(message);
		this.remoteMessage = remoteMessage;
		this.type = type;
	}

	static fromError(error) {
		const httpError = fromError(error);
		httpError.response = error?.response;
		return httpError;
	}
}

export class HttpNetworkError extends BaseHttpError {}

export class HttpServerError extends BaseHttpError {
	constructor(message) {
		super('server', 'Server Error', message);
	}
}

export class HttpUnknownError extends BaseHttpError {
	constructor(originalError) {
		super('unknown', originalError?.message);
		this.originalError = originalError;
		this.stack = originalError?.stack;
	}
}

export class HttpClientError extends BaseHttpError {
	constructor(type, message) {
		super(type, 'Client Error', message);
	}
}

function extractErrorMessageFromResponse(response) {
	const message =
		response.data?.error?.message ??
		response.data?.message ??
		((typeof response.data === 'object' && JSON.stringify(response.data)) ||
			'Oops! Something went wrong!');

	return message;
}

const is400 = status => status >= 400 && status <= 499;
const is500 = status => status >= 500 && status <= 599;

const exchangeStatusCodeToType = {
	401: 'unauthorized',
	403: 'forbidden',
	404: 'not-found',
	400: 'bad-request',
	422: 'unprocessable-entity',
	429: 'too-many-requests',
	0: 'rejected',
};

export const fromError = error => {
	if (error.message.includes('Network Error')) {
		return new HttpNetworkError('connection', 'Unabled to connect');
	}

	if (axios.isCancel(error)) {
		return new HttpClientError('canceled', 'Canceled');
	}

	if (error.code?.includes('ECONNABORTED')) {
		return new HttpNetworkError('timeout', 'Time Out');
	}

	if (error.response?.status) {
		const statusCode = error.response.status;

		if (is400(statusCode)) {
			const { message } = extractErrorMessageFromResponse(error.response);
			return new HttpClientError(exchangeStatusCodeToType[statusCode || 0], message);
		} else if (is500(statusCode)) {
			const { message } = extractErrorMessageFromResponse(error.response);
			return new HttpServerError(message);
		}
	} else if (error instanceof BaseHttpError) {
		return error;
	}

	return new HttpUnknownError(error);
};

export const isUnauthorizedError = error => {
	return error instanceof HttpClientError && error.type === 'unauthorized';
};

export const isTooManyRequestsError = error => {
	return error instanceof HttpClientError && error.type === 'too-many-requests';
};

export const isBadRequestError = error => {
	return error instanceof HttpClientError && error.type === 'bad-request';
};

export const isServerError = error => {
	return error instanceof HttpServerError;
};
