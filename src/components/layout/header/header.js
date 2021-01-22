import { useTranslation } from 'hooks';

export const Header = props => {
	const { t } = useTranslation();
	return <div>{t('Header')}</div>;
};
