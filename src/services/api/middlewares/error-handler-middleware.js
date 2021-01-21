import { BaseHttpError } from '../../common/http-client/errors';

export class ErrorHandlerMiddleware {
	errorHandler;

	constructor(errorHandler) {
		this.errorHandler = errorHandler;
	}

	onResponseError(error) {
		const httpError = BaseHttpError.fromError(error);
		this.errorHandler(httpError);
		throw httpError;
	}
}
