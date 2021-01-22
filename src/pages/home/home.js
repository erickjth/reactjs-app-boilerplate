import React from 'react';
import { LoginButton } from 'components/auth';
import './home.css';

export const HomePage = props => {
	return (
		<div className='Home'>
			<p className='Home-intro'>
				To get started, edit <code>src/app.js</code> or <code>src/pages/home.js</code> and
				save to reload.
			</p>
			<ul className='Home-resources'>
				<li>
					<a href='https://create-react-app.dev/'>Docs</a>
				</li>
				<li>
					<LoginButton />
				</li>
			</ul>
		</div>
	);
};
