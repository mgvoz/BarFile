import React from 'react';
import Navbar from './Navbar';

function Settings() {
	return (
		<div className='settings-container'>
			<div className='row'>
				<div id='nav-section' className='col-2'>
					<Navbar />
				</div>
				<div className='col-10'>
					<h1 className='dash-heading'>Settings</h1>
					<hr className='dash-line' />
					<div className='take-inventory'>
						set up threshold, what products come from each
						distributer, set categories
					</div>
				</div>
			</div>
		</div>
	);
}

export default Settings;
