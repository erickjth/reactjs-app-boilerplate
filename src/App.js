import { useCallback, useRef, useState, useEffect } from 'react';
import { configureServices, ServicesProvider } from 'services';
import { RootStoreProvider } from 'stores';
import { STATUSES } from 'constants/statuses';
import { ThemeProvider, useThemeFactory, GlobalStyles } from 'theme';
import { AppNavigator, LocationProvider } from 'navigation';

export const Application = () => {
	const [status, setStatus] = useState(STATUSES.PENDING);
	const servicesContainer = useRef(null);

	const setupApplication = useCallback(async () => {
		try {
			const container = await configureServices();
			servicesContainer.current = container;
			// Get the store and bootstrap all internal stores
			const rootStore = container.get('rootStore');
			await rootStore.bootstrap();

			setStatus(STATUSES.DONE);
		} catch (e) {
			setStatus(STATUSES.ERROR);
		}
	}, []);

	const theme = useThemeFactory();

	useEffect(() => {
		setupApplication();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	if (status === STATUSES.PENDING) {
		return <p>Loading application....</p>; // @TODO: Show spinner
	}

	if (status === STATUSES.ERROR) {
		return <p>Error loading application....</p>; // @TODO: Show something better
	}

	return (
		<ServicesProvider value={servicesContainer.current}>
			<RootStoreProvider>
				<ThemeProvider theme={theme}>
					<LocationProvider>
						<AppNavigator />
						<GlobalStyles />
					</LocationProvider>
				</ThemeProvider>
			</RootStoreProvider>
		</ServicesProvider>
	);
};

export default Application;
