import React from 'react';
import mlogo from '../../images/navlogo.png';
import { Link } from 'react-router-dom';

function NavbarMobile({ user, logout, stopStream }) {
	return (
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
			<div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
				<div className='navbar-nav mr-auto'>
					<Link
						to='/dashboard'
						id='nav-item-m'
						className='nav-item nav-link'
						onClick={stopStream}
					>
						Dashboard
					</Link>
					<Link
						to='/settings'
						id='nav-item-m'
						className='nav-item nav-link'
						onClick={stopStream}
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
	);
}

export default NavbarMobile;
