import React from 'react';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';

function NavbarDesktop({ user, logout, stopStream }) {
	return (
		<div className='nav-container'>
			<ul>
				<li>
					<center>
						<a href='/dashboard'>
							<img
								className='logo'
								src={logo}
								alt='BarFile logo'
							/>
						</a>
					</center>
					<p className='nav-name'>{user?.result?.name}</p>
				</li>
				<hr className='nav-line' />
				<li>
					<Link
						to='/dashboard'
						id='nav-item'
						className='nav-item nav-link'
						onClick={stopStream}
					>
						Dashboard
					</Link>
				</li>

				<li>
					<Link
						to='/settings'
						id='nav-item'
						className='nav-item nav-link'
						onClick={stopStream}
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
	);
}

export default NavbarDesktop;
