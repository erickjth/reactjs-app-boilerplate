const config = {
	api: {
		url: process.env.REACT_APP_API_URL,
		timeout: process.env.REACT_APP_API_TIMEOUT,
		logEnabled: process.env.REACT_APP_API_LOG_ENABLED === 'true',
		useMock: process.env.REACT_APP_API_USE_MOCK === 'true',
		mockResponseDelay: process.env.REACT_APP_API_MOCK_RESPONSE_DELAY,
	},
};

export default config;
