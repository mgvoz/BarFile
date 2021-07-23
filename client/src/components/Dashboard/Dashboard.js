import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactExport from 'react-export-excel';
import Loading from '../Loading';
import DashboardDesktop from './DashboardDesktop';
import DashboardMobile from './DashboardMobile';

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
						<DashboardDesktop
							settings={settings}
							items={items}
							mostRecentItems={mostRecentItems}
							dataSet={dataSet}
							dataSet2={dataSet2}
							date={date}
							ExcelColumn={ExcelColumn}
							ExcelFile={ExcelFile}
							ExcelSheet={ExcelSheet}
						/>
					) : (
						<DashboardMobile
							settings={settings}
							items={items}
							mostRecentItems={mostRecentItems}
							dataSet={dataSet}
							dataSet2={dataSet2}
							date={date}
							ExcelColumn={ExcelColumn}
							ExcelFile={ExcelFile}
							ExcelSheet={ExcelSheet}
						/>
					)}
				</>
			) : (
				<Loading />
			)}
		</>
	);
}

export default Dashboard;
