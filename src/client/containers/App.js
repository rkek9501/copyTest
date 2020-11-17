import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Test } from './pages/index';
import { AppProvider } from '../context';

if (process.env.NODE_ENV === 'production') {
	console.log = () => {};
};

export default class App extends React.Component {
	render() {
		return (
			<AppProvider>
				<Router>
					<div className="main-container">
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/test" component={Test} />
						</Switch>
					</div>
				</Router>
			</AppProvider>
		);
	}
}
