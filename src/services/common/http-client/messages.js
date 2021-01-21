export const genericMessages = {
	generic: 'Oop! Something went wrong. Please try again',
	connection: 'Unable to connect. Please check your internet connection.',
	timeout: 'Unable to connect. Please try again.',
	unknown: 'Oop! Something went wrong with the server.',
	server: 'Oop! Something went wrong with the server.',
	forbidden: 'Authorized request',
	unauthorized: 'Unauthorized request',
};

/**
 * [path]: 'message'|function // cover for all errors regardless of the method
 * [path]: { [status]: message|function }// Specific error for a statusCode, not matter the method }
 * [path]: { [method]: message|function } } // Specific error for a path+method }
 * [path]: { [method]: { [status] }: message|function } } // Specific error for a path+statusCode+method }
 */
export const defaultMessagesMapper = {};

/**
 * Check if the given response can be transformed in a custom message
 */
export const isHandleable = (response, customMessagesMapper = {}) => {
	const { config, status = '' } = response;
	const { url = '', baseURL = '', method = '' } = config ?? {};
	const path = url.replace(baseURL, '');

	const isValidType = input => typeof input === 'string' || typeof input === 'function';

	let result;
	const statusCode = `${status}`;

	const messagesMapper = {
		...defaultMessagesMapper,
		...customMessagesMapper,
	};

	// Get error based on path, path+status, path+method, path+method+status
	if (isValidType(messagesMapper[path])) {
		result = messagesMapper[path];
	} else if (isValidType(messagesMapper[path]?.[status])) {
		result = messagesMapper[path][status];
	} else if (isValidType(messagesMapper[path]?.[method])) {
		result = messagesMapper[path][method];
	} else if (isValidType(messagesMapper[path]?.[method]?.[statusCode])) {
		result = messagesMapper[path][method][statusCode];
	}

	if (typeof result === 'function') {
		return result.call(null, response);
	}

	return result;
};
