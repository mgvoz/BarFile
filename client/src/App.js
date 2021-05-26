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
import { getItems } from './actions/inventory';

function App() {
	const dispatch = useDispatch();
	const settings = useSelector((state) => state.settings);
	const items = useSelector((state) => state.items);

	const [currentSettingId, setCurrentSettingId] = useState(0);
	const [currentItemId, setCurrentItemId] = useState(0);

	useEffect(() => {
		dispatch(getSettings());
	}, [currentSettingId, dispatch]);

	useEffect(() => {
		dispatch(getItems());
	}, [currentItemId, dispatch]);

	return (
		<>
			<BrowserRouter>
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route exact path='/dashboard'>
						<Dashboard items={items} settings={settings} />
					</Route>
					<Route exact path='/inventory'>
						<Inventory items={items} settings={settings} />
					</Route>
					<Route exact path='/settings'>
						<Settings settings={settings} />
					</Route>
				</Switch>
				<Footer />
			</BrowserRouter>
		</>
	);
}

export default App;
