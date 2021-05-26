import React from 'react';
import Navbar from './Navbar';

function Dashboard() {
	//set variables
	var w = window.innerWidth;

	//download to excel sheet

	return (
		<>
			{w > 480 ? (
				<div className='dash-container'>
					<div className='row'>
						<div id='nav-section' className='col-3'>
							<Navbar />
						</div>
						<div className='col-9'>
							<h1 className='dash-heading'>Dashboard</h1>
							<hr className='dash-line' />
							<h4 className='dash-subheading'>Recent Reports</h4>
							<div className='dash-data'>(data here)</div>
							<h4 className='dash-subheading'>Upcoming Orders</h4>
							<div className='dash-data'>(data here)</div>
						</div>
					</div>
				</div>
			) : (
				<>
					<Navbar />
					<div className='dash-container-m'>
						<div>
							<h1 className='dash-heading-m'>Dashboard</h1>
							<hr className='dash-line-m' />
							<h4 className='dash-subheading-m'>
								Recent Reports
							</h4>

							<div className='dash-data-m'>(data here)</div>
							<h4 className='dash-subheading-m'>
								Upcoming Orders
							</h4>
							<div className='dash-data-m'>(data here)</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default Dashboard;
