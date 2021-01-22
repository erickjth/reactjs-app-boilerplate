import React from 'react';
import logo from 'assets/images/logo.svg';
import { useTranslation } from 'hooks';
import './header.css';

export const Header = props => {
	const { t } = useTranslation();
	return (
		<div className='Home-header'>
			<img src={logo} className='Home-logo' alt='logo' />
			<h2>{t('Header')}</h2>
		</div>
	);
};
