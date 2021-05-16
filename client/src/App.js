import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Settings from './components/Settings';
import { getSettings } from './actions/settings';

function App() {
	const dispatch = useDispatch();
	const settings = useSelector((state) => state.settings);

	const [currentSettingId, setCurrentSettingId] = useState(0);

	useEffect(() => {
		dispatch(getSettings());
	}, [currentSettingId, dispatch]);

	return (
		<>
			<BrowserRouter>
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route exact path='/dashboard'>
						<Dashboard />
					</Route>
					<Route exact path='/inventory'>
						<Inventory />
					</Route>
					<Route exact path='/settings'>
						<Settings
							settings={settings}
							currentSettingId={currentSettingId}
							setCurrentSettingId={setCurrentSettingId}
						/>
					</Route>
				</Switch>
				<Footer />
			</BrowserRouter>
		</>
	);
}

export default App;
