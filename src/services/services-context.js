import { createContext, useContext } from 'react';

const ServicesContext = createContext(null);

export const ServicesProvider = ServicesContext.Provider;

export const useServices = () => {
	const services = useContext(ServicesContext);

	if (services === null) {
		throw new Error('services should be provided in ThemeProvider');
	}

	return services;
};
