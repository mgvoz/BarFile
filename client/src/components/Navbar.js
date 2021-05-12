import React, { useState, useEffect } from 'react';
import logo from '../images/logo.png';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import * as actionType from '../constants/actionTypes';

function Navbar() {
	//set variables
	const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem('profile')),
	);

	//dispatch logout function for logout button
	const logout = () => {
		dispatch({ type: actionType.LOGOUT });
		alert('Logout successful');
		history.push('/');
		setUser(null);
	};

	//get user info for navbar, set auto-logout
	useEffect(() => {
		const token = user?.token;
		if (token) {
			const decodedToken = decode(token);

			if (decodedToken.exp * 1000 < new Date().getTime()) logout();
		}
		setUser(JSON.parse(localStorage.getItem('profile')));
	}, [location]);

	return (
		<div>
			<div></div>
		</div>
	);
}

export default Navbar;
