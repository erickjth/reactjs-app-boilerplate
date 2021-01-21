import React from 'react';
import logo from 'assets/images/logo.svg';
import { LoginButton } from 'components/auth';

export const HomePage = props => {
	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<LoginButton />
			</header>
		</div>
	);
};
