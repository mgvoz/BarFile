import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactExport from 'react-export-excel';
import Loading from './Loading';
import Navbar from './Navbar';

function Dashboard() {
	//set variables
	const [loading, setLoading] = useState(true);
	const [width, setWidth] = useState(0);
	const user = JSON.parse(localStorage.getItem('profile'));
	const settings = useSelector((state) =>
		state.settings.filter(
			(s) =>
				user?.result?.googleId === s?.creator ||
				user?.result?._id === s?.creator,
		),
	);
	const items = useSelector((state) =>
		state.items.filter(
			(i) =>
				user?.result?.googleId === i?.creator ||
				user?.result?._id === i?.creator,
		),
	);

	//set loading screen
	useEffect(() => {
		setTimeout(() => setLoading(false), 2000);
		setTimeout(() => setWidth(window.innerWidth), 2000);
	}, []);

	//sort items for 5 most recent
	const sortedItems = items
		.slice()
		.sort((a, b) => b.lastUpdated - a.lastUpdated);
	const mostRecentItems = sortedItems.reverse().slice(0, 5);

	//excel file export
	const ExcelFile = ReactExport.ExcelFile;
	const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
	const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
	const date = new Date();
	const itemsBelowThreshold = items.filter(
		(i) => i.quantityRemaining < parseFloat(settings[0]?.threshold),
	);
	let dataSet = [];
	let dataSet2 = [];

	const createDataSet = () => {
		items.forEach((i) =>
			dataSet.push({
				item: i.nameOfItem,
				quantity: i.quantityRemaining,
				category: i.category,
				distributer: i.distributer,
			}),
		);
		itemsBelowThreshold.forEach((i) =>
			dataSet2.push({
				item: i.nameOfItem,
				quantity: i.quantityRemaining,
				category: i.category,
				distributer: i.distributer,
			}),
		);
	};
	createDataSet();

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
										{settings.length === 0 ? (
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
															settings[0]
																?.distributers
														}
													</b>
												</p>
												<p className='dash-setting-list'>
													<b>
														Categories:{' '}
														{
															settings[0]
																?.categories
														}
													</b>
												</p>
												<p className='dash-setting-list'>
													<b>
														Threshold:{' '}
														{settings[0]?.threshold}
													</b>
												</p>
											</>
										)}
									</div>
									<h4 className='dash-subheading'>
										Recent Item Entries
									</h4>
									<div className='dash-data'>
										{items.length > 0 ? (
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
										<ExcelFile
											element={
												<button className='dwnload-btn'>
													Download All Inventory
												</button>
											}
											filename={
												'Bar Inventory ' +
												date.toDateString()
											}
										>
											<ExcelSheet
												data={dataSet}
												name='Bar Inventory'
											>
												<ExcelColumn
													label='Item'
													value='item'
												/>
												<ExcelColumn
													label='Quantity Remaining'
													value='quantity'
												/>
												<ExcelColumn
													label='Category'
													value='category'
												/>
												<ExcelColumn
													label='Distributer'
													value='distributer'
												/>
											</ExcelSheet>
										</ExcelFile>
										<br />
										<ExcelFile
											element={
												<button className='dwnload-btn'>
													Download All Inventory Below
													Set Threshold
												</button>
											}
											filename={
												'Bar Inventory Below Threshold ' +
												date.toDateString()
											}
										>
											<ExcelSheet
												data={dataSet2}
												name='Bar Inventory Below Threshold'
											>
												<ExcelColumn
													label='Item'
													value='item'
												/>
												<ExcelColumn
													label='Quantity Remaining'
													value='quantity'
												/>
												<ExcelColumn
													label='Category'
													value='category'
												/>
												<ExcelColumn
													label='Distributer'
													value='distributer'
												/>
											</ExcelSheet>
										</ExcelFile>
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
										{settings.length === 0 ? (
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
															settings[0]
																?.distributers
														}
													</b>
												</p>
												<p className='dash-setting-list'>
													<b>
														Categories:{' '}
														{
															settings[0]
																?.categories
														}
													</b>
												</p>
												<p className='dash-setting-list'>
													<b>
														Threshold:{' '}
														{settings[0]?.threshold}
													</b>
												</p>
											</>
										)}
									</div>
									<h4 className='dash-subheading-m'>
										Recent Item Entries
									</h4>
									<div className='dash-data-m'>
										{items.length > 0 ? (
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
										<ExcelFile
											element={
												<button className='dwnload-btn'>
													Download All Inventory
												</button>
											}
											filename={
												'Bar Inventory ' +
												date.toDateString()
											}
										>
											<ExcelSheet
												data={dataSet}
												name='Bar Inventory'
											>
												<ExcelColumn
													label='Item'
													value='item'
												/>
												<ExcelColumn
													label='Quantity Remaining'
													value='quantity'
												/>
												<ExcelColumn
													label='Category'
													value='category'
												/>
												<ExcelColumn
													label='Distributer'
													value='distributer'
												/>
											</ExcelSheet>
										</ExcelFile>
										<br />
										<ExcelFile
											element={
												<button className='dwnload-btn'>
													Download All Inventory Below
													Set Threshold
												</button>
											}
											filename={
												'Bar Inventory Below Threshold ' +
												date.toDateString()
											}
										>
											<ExcelSheet
												data={dataSet2}
												name='Bar Inventory Below Threshold'
											>
												<ExcelColumn
													label='Item'
													value='item'
												/>
												<ExcelColumn
													label='Quantity Remaining'
													value='quantity'
												/>
												<ExcelColumn
													label='Category'
													value='category'
												/>
												<ExcelColumn
													label='Distributer'
													value='distributer'
												/>
											</ExcelSheet>
										</ExcelFile>
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
