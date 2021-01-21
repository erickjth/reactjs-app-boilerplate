import React from 'react';

export function useThemeFactory() {
	const theme = React.useMemo(() => {}, []);
	return theme;
}
