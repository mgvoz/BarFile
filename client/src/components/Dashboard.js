import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Navbar from './Navbar';

function Dashboard({ items, settings }) {
	//set variables
	var w = window.innerWidth;
	const [loading, setLoading] = useState(true);

	//set loading screen
	useEffect(() => {
		setTimeout(() => setLoading(false), 4000);
	}, []);

	//download to excel sheet

	return (
		<>
			{loading === false ? (
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
									<h4 className='dash-subheading'>
										Recent Reports
									</h4>
									<div className='dash-data'>(data here)</div>
									<h4 className='dash-subheading'>
										Upcoming Orders
									</h4>
									<div className='dash-data'>(data here)</div>
								</div>
							</div>
						</div>
					) : (
						<>
							<Navbar />
							<div className='dash-container-m'>
								<div>
									<h1 className='dash-heading-m'>
										Dashboard
									</h1>
									<hr className='dash-line-m' />
									<h4 className='dash-subheading-m'>
										Recent Reports
									</h4>

									<div className='dash-data-m'>
										(data here)
									</div>
									<h4 className='dash-subheading-m'>
										Upcoming Orders
									</h4>
									<div className='dash-data-m'>
										(data here)
									</div>
								</div>
							</div>
						</>
					)}
				</>
			) : (
				<Loading />
			)}
		</>
	);
}

export default Dashboard;
