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
		<div className='nav-container'>
			<ul className=''>
				<li>
					<a href='/dashboard'>
						<img className='logo' src={logo} alt='BarFile logo' />
					</a>

					<p className='nav-name'>{user?.result?.name}</p>
				</li>
				<hr className='nav-line' />
				<li>
					<Link
						to='/dashboard'
						id='nav-item'
						className='nav-item nav-link'
					>
						Dashboard
					</Link>
				</li>
				<li>
					<Link
						to='/inventory'
						id='nav-item'
						className='nav-item nav-link'
					>
						Take Inventory
					</Link>
				</li>
				<li>
					<Link
						to='/settings'
						id='nav-item'
						className='nav-item nav-link'
					>
						Settings
					</Link>
				</li>
			</ul>
			<center>
				<button
					className='logout-button'
					type='submit'
					onClick={logout}
				>
					Logout
				</button>
			</center>
		</div>
	);
}

export default Navbar;
