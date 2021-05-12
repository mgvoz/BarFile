import React from 'react';
import Navbar from './Navbar';

function Dashboard() {
	return (
		<div className='dash-containter'>
			<div className='row'>
				<div id='nav-section' className='col-sm'>
					<Navbar />
				</div>
				<div className='col-lg'>Test</div>
			</div>
		</div>
	);
}

export default Dashboard;
