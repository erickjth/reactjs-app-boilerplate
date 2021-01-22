import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation, useStores } from 'hooks';

export const LoginButton = observer(props => {
	const { session } = useStores();
	const { t } = useTranslation();

	const handleOnClickLogin = useCallback(() => {
		session.login('john@doe.org', 'secret');
	}, [session]);

	const handleOnClickLogout = useCallback(() => {
		session.logout();
	}, [session]);

	return (
		<div>
			{session.isLoggedIn ? (
				<button onClick={handleOnClickLogout}>{t('Log Out')}</button>
			) : (
				<button onClick={handleOnClickLogin} disabled={session.isLoggingIn}>
					{t('Log In')}
				</button>
			)}
		</div>
	);
});
