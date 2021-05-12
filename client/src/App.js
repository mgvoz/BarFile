import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';

function App() {
	const user = JSON.parse(localStorage.getItem('profile'));
	const dispatch = useDispatch();
	//const rubrics = useSelector((state) => state.rubrics);

	//const [currentRubricId, setCurrentRubricId] = useState(0);

	/*useEffect(() => {
		dispatch(getRubrics());
	}, [currentRubricId, dispatch]);*/

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
					<Route></Route>
					<Route></Route>
				</Switch>
				<Footer />
			</BrowserRouter>
		</>
	);
}

export default App;
