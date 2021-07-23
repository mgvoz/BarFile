import React, { useState, useEffect } from 'react';
import Loading from '../Loading';
import { useDispatch, useSelector } from 'react-redux';
import { saveItem, editItem } from '../../actions/inventory';
import { useHistory } from 'react-router-dom';
import ManualEntryDesktop from './ManualEntryDesktop';
import ManualEntryMobile from './ManualEntryMobile';

function ManualEntry() {
	//set variables
	const dispatch = useDispatch();
	const history = useHistory();
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
	const [width, setWidth] = useState(0);
	const [loading, setLoading] = useState(true);
	const [itemData, setItemData] = useState({
		nameOfUser: user?.result?.name,
		creator: user?.result?.googleId || user?.result?._id,
		lastUpdated: new Date().toDateString(),
		quantityRemaining: '',
		category: '',
		distributer: '',
		nameOfItem: '',
		barcode: '',
	});

	//set loading screen
	useEffect(() => {
		setTimeout(() => setLoading(false), 2000);
		setTimeout(() => setWidth(window.innerWidth), 2000);
	}, []);

	const distributers = settings[0]?.distributers[0]?.split(', ');
	const categories = settings[0]?.categories[0]?.split(', ');

	//save data entry
	const saveItemData = (e) => {
		e.preventDefault();
		if (items.length > 0) {
			const match = items.filter(
				(item) => item.barcode === itemData.barcode,
			);
			if (match.length !== 0) {
				dispatch(editItem(match[0]._id, { ...itemData }));
				alert('Item saved successfully.');
				history.push('/manual-entry');
			} else {
				dispatch(saveItem({ itemData }));
				alert('Item saved successfully.');
				history.push('/manual-entry');
			}
		} else {
			dispatch(saveItem({ itemData }));
			alert('Item saved successfully.');
			history.push('/manual-entry');
		}
	};

	return (
		<>
			{loading === false ? (
				<>
					{width >= 1000 ? (
						<ManualEntryDesktop
							settings={settings}
							distributers={distributers}
							categories={categories}
							saveItemData={saveItemData}
							itemData={itemData}
							setItemData={setItemData}
						/>
					) : (
						<ManualEntryMobile
							settings={settings}
							distributers={distributers}
							categories={categories}
							saveItemData={saveItemData}
							itemData={itemData}
							setItemData={setItemData}
						/>
					)}
				</>
			) : (
				<Loading />
			)}
		</>
	);
}

export default ManualEntry;
