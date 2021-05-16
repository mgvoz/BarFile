import React, { useState, useEffect } from 'react';
import logo from '../images/logo.png';
import mlogo from '../images/navlogo.png';
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
	var w = window.innerWidth;

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
		<>
			{w > 480 ? (
				<div className='nav-container'>
					<ul>
						<li>
							<a href='/dashboard'>
								<img
									className='logo'
									src={logo}
									alt='BarFile logo'
								/>
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
								to='/settings'
								id='nav-item'
								className='nav-item nav-link'
							>
								Settings
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
			) : (
				<div className='nav-container-m'>
					<a href='/dashboard'>
						<img className='mlogo' src={mlogo} alt='BarFile logo' />
					</a>
					<p className='nav-name-m'>{user?.result?.name}</p>
					<center>
						<button
							className='navbar-toggler'
							type='button'
							data-toggle='collapse'
							data-target='#navbarNavAltMarkup'
							aria-controls='navbarNavAltMarkup'
							aria-expanded='false'
							aria-label='Toggle navigation'
						>
							<span className='navbar-toggler-icon'>
								<i id='nav-bars' className='fas fa-bars'></i>
							</span>
						</button>
					</center>
					<div
						className='collapse navbar-collapse'
						id='navbarNavAltMarkup'
					>
						<div className='navbar-nav mr-auto'>
							<Link
								to='/dashboard'
								id='nav-item-m'
								className='nav-item nav-link'
							>
								Dashboard
							</Link>
							<Link
								to='/settings'
								id='nav-item-m'
								className='nav-item nav-link'
							>
								Settings
							</Link>
							<Link
								to='/inventory'
								id='nav-item-m'
								className='nav-item nav-link'
							>
								Take Inventory
							</Link>
						</div>
						<center>
							<button
								className='logout-button-m'
								type='submit'
								onClick={logout}
							>
								Logout
							</button>
						</center>
						<hr className='nav-line' />
					</div>
				</div>
			)}
		</>
	);
}

export default Navbar;
