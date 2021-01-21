import { createContext, useContext } from 'react';
import { useServices } from 'hooks/use-services';

const RootStoreContext = createContext(null);

export const RootStoreProvider = props => {
	const container = useServices();

	const rootStore = container.get('rootStore');

	return <RootStoreContext.Provider {...props} value={rootStore} />;
};

export const useStores = () => {
	const store = useContext(RootStoreContext);

	if (store === null) {
		throw new Error('Store must be set in the provider');
	}

	return store;
};
