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
import ManualEntry from './components/ManualEntry';
import { getSettings } from './actions/settings';
import { getItems } from './actions/inventory';

function App() {
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem('profile'));
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

	//get current user's items
	const thisUsersItems = items.filter(
		(i) =>
			user?.result?.googleId === i?.creator ||
			user?.result?._id === i?.creator,
	);

	//get current user's settings
	const thisUsersSettings = settings.filter(
		(s) =>
			user?.result?.googleId === s?.creator ||
			user?.result?._id === s?.creator,
	);

	return (
		<>
			<BrowserRouter>
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route path='/dashboard'>
						<Dashboard
							thisUsersItems={thisUsersItems}
							thisUsersSettings={thisUsersSettings}
						/>
					</Route>
					<Route path='/settings'>
						<Settings thisUsersSettings={thisUsersSettings} />
					</Route>
					<Route path='/inventory'>
						<Inventory
							thisUsersItems={thisUsersItems}
							thisUsersSettings={thisUsersSettings}
						/>
					</Route>
					<Route path='/manual-entry'>
						<ManualEntry
							thisUsersItems={thisUsersItems}
							thisUsersSettings={thisUsersSettings}
						/>
					</Route>
				</Switch>
				<Footer />
			</BrowserRouter>
		</>
	);
}

export default App;
