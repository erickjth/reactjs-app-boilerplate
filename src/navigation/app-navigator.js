import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage } from 'pages';
import { Header, AppContainer } from 'components/layout';
import locations from './locations';

export const AppNavigator = () => (
	<Router>
		<div>
			<Header />
			<AppContainer>
				<Switch>
					<Route exact path={locations.home.path} component={HomePage} />
				</Switch>
			</AppContainer>
		</div>
	</Router>
);
