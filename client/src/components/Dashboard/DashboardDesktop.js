import React from 'react';
import Navbar from '../Navbar/Navbar';

function DashboardDesktop({
	settings,
	items,
	mostRecentItems,
	dataSet,
	dataSet2,
	date,
	ExcelColumn,
	ExcelFile,
	ExcelSheet,
}) {
	return (
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
								Get started by establishing your settings on the
								Settings page.
							</p>
						) : (
							<>
								<p className='dash-set-heading'>
									Here are your current settings:
								</p>
								<p className='dash-setting-list'>
									<b>
										Distributers:{' '}
										{settings[0]?.distributers}
									</b>
								</p>
								<p className='dash-setting-list'>
									<b>Categories: {settings[0]?.categories}</b>
								</p>
								<p className='dash-setting-list'>
									<b>Threshold: {settings[0]?.threshold}</b>
								</p>
							</>
						)}
					</div>
					<h4 className='dash-subheading'>Recent Item Entries</h4>
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
										| {item.category} | {item.distributer}
									</li>
								))}
							</ol>
						) : (
							<p>No items entered yet.</p>
						)}
					</div>
					<h4 className='dash-subheading'>Reports</h4>
					<div className='dash-data'>
						{items.length === 0 ? (
							<p>
								Please take inventory in order to download
								reports.
							</p>
						) : (
							<>
								<ExcelFile
									element={
										<button className='dwnload-btn'>
											Download All Inventory
										</button>
									}
									filename={
										'Bar Inventory ' + date.toDateString()
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
											Download All Inventory Below Set
											Threshold
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
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default DashboardDesktop;
