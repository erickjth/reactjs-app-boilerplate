import React, { useContext } from 'react';

// @TODO: Use proper theme provider
const themeContext = React.createContext(null);

const ThemeProvider = themeContext.Provider;

const useTheme = () => {
	const theme = useContext(themeContext);

	if (theme === null) {
		throw new Error('Theme should be provided in ThemeProvider');
	}

	return theme;
};

export { ThemeProvider, useTheme };
