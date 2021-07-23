import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import * as actionType from '../../constants/actionTypes';
import NavbarDesktop from './NavbarDesktop';
import NavbarMobile from './NavbarMobile';

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
		stopStream();
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

	//stop stream when leaving inventory page or logging out
	const stopStream = () => {
		if (document.getElementById('video')) {
			const stream = document.getElementById('video')?.srcObject;
			const tracks = stream?.getTracks();
			tracks?.forEach(function (track) {
				track.stop();
			});
			document.getElementById('video').srcObject = null;
		}
		return '';
	};

	return (
		<>
			{window.innerWidth >= 1000 ? (
				<NavbarDesktop
					user={user}
					logout={logout}
					stopStream={stopStream}
				/>
			) : (
				<NavbarMobile
					user={user}
					logout={logout}
					stopStream={stopStream}
				/>
			)}
		</>
	);
}

export default Navbar;
