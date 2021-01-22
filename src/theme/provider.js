import React, { useContext } from 'react';

// @TODO: Use proper theme provider
const ThemeContext = React.createContext(null);

const ThemeProvider = ({ theme, ...rest }) => <ThemeContext.Provider value={theme} {...rest} />;

const useTheme = () => {
	const theme = useContext(ThemeContext);

	if (theme === null) {
		throw new Error('Theme should be provided in ThemeProvider');
	}

	return theme;
};

export { ThemeProvider, useTheme };
