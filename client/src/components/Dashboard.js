import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Navbar from './Navbar';

function Dashboard({ items, settings }) {
	//set variables
	const [loading, setLoading] = useState(true);
	const [width, setWidth] = useState(0);
	const user = JSON.parse(localStorage.getItem('profile'));

	//set loading screen
	useEffect(() => {
		setTimeout(() => setLoading(false), 4000);
		setTimeout(() => setWidth(window.innerWidth), 4000);
	}, []);

	//get current user's items
	const thisUsersItems = items.filter(
		(i) =>
			user?.result?.googleId === i?.creator ||
			user?.result?._id === i?.creator,
	);

	//get current user's settings
	const thisUsersSettings = settings.filter(
		(s) =>
			user?.result?.googleId === s?.creator ||
			user?.result?._id === s?.creator,
	);

	//sort items for 5 most recent
	const sortedItems = thisUsersItems
		.slice()
		.sort((a, b) => b.lastUpdated - a.lastUpdated);
	const mostRecentItems = sortedItems.reverse().slice(0, 5);

	//download to excel sheet

	console.log(thisUsersItems);
	console.log(sortedItems);
	console.log(mostRecentItems);

	return (
		<>
			{loading === false ? (
				<>
					{width >= 1000 ? (
						<div className='dash-container'>
							<div className='row'>
								<div id='nav-section' className='col-3'>
									<Navbar />
								</div>
								<div className='col-9'>
									<h1 className='dash-heading'>Dashboard</h1>
									<hr className='dash-line' />
									<div className='dash-settings'>
										{thisUsersSettings.length === 0 ? (
											<p className='dash-set-heading'>
												Get started by establishing your
												settings on the Settings page.
											</p>
										) : (
											<>
												<p className='dash-set-heading'>
													Here are your current
													settings:
												</p>
												<p className='dash-setting-list'>
													<b>
														Distributers:{' '}
														{
															thisUsersSettings[0]
																?.distributers
														}
													</b>
												</p>
												<p className='dash-setting-list'>
													<b>
														Categories:{' '}
														{
															thisUsersSettings[0]
																?.categories
														}
													</b>
												</p>
												<p className='dash-setting-list'>
													<b>
														Threshold:{' '}
														{
															thisUsersSettings[0]
																?.threshold
														}
													</b>
												</p>
											</>
										)}
									</div>
									<h4 className='dash-subheading'>
										Recent Item Entries
									</h4>
									<div className='dash-data'>
										{thisUsersItems.length > 0 ? (
											<ol>
												{mostRecentItems.map((item) => (
													<li className='dash-list-item'>
														{item.nameOfItem} |{' '}
														{item.quantityRemaining
															? item.quantityRemaining +
															  ' remaining '
															: 'No quantity entered '}
														| {item.category} |{' '}
														{item.distributer}
													</li>
												))}
											</ol>
										) : (
											<p>No items entered yet.</p>
										)}
									</div>
									<h4 className='dash-subheading'>Reports</h4>
									<div className='dash-data'>
										<p className='download-link'>
											<b>All Inventory:</b> Download
										</p>
										<p className='download-link'>
											<b>
												Upcoming Order (all items that
												fall below your set threshold):
											</b>{' '}
											Download
										</p>
									</div>
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
									<div className='dash-settings-m'>
										{thisUsersSettings.length === 0 ? (
											<p className='dash-set-heading'>
												Get started by establishing your
												settings on the Settings page.
											</p>
										) : (
											<>
												<p className='dash-set-heading'>
													Here are your current
													settings:
												</p>
												<p className='dash-setting-list'>
													<b>
														Distributers:{' '}
														{
															thisUsersSettings[0]
																?.distributers
														}
													</b>
												</p>
												<p className='dash-setting-list'>
													<b>
														Categories:{' '}
														{
															thisUsersSettings[0]
																?.categories
														}
													</b>
												</p>
												<p className='dash-setting-list'>
													<b>
														Threshold:{' '}
														{
															thisUsersSettings[0]
																?.threshold
														}
													</b>
												</p>
											</>
										)}
									</div>
									<h4 className='dash-subheading-m'>
										Recent Item Entries
									</h4>
									<div className='dash-data-m'>
										{thisUsersItems.length > 0 ? (
											<ol>
												{mostRecentItems.map((item) => (
													<li className='dash-list-item'>
														{item.nameOfItem} |{' '}
														{item.quantityRemaining
															? item.quantityRemaining +
															  ' remaining '
															: 'No quantity entered '}
														| {item.category} |{' '}
														{item.distributer}
													</li>
												))}
											</ol>
										) : (
											<p>No items entered yet.</p>
										)}
									</div>
									<h4 className='dash-subheading-m'>
										Reports
									</h4>
									<div className='dash-data-m'>
										<p className='download-link'>
											<b>All Inventory:</b> Download
										</p>
										<p className='download-link'>
											<b>
												Upcoming Order (all items that
												fall below your set threshold):
											</b>{' '}
											Download
										</p>
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
