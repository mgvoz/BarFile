import React from 'react';
import Navbar from './Navbar';

function Dashboard() {
	return (
		<div className='dash-container'>
			<div className='row'>
				<div id='nav-section' className='col-2'>
					<Navbar />
				</div>
				<div className='col-10'>
					<h1 className='dash-heading'>Dashboard</h1>
					<h4 className='dash-subheading'>Recent Reports</h4>
					<hr className='dash-line' />
					<div className='dash-data'>(data here)</div>
					<h4 className='dash-subheading'>Upcoming Orders</h4>
					<hr className='dash-line' />
					<div className='dash-data'>(data here)</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
