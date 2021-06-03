import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Loading from './Loading';
import { useDispatch } from 'react-redux';
import { saveItem, editItem } from '../actions/inventory';

function ManualEntry({ items, settings }) {
	//set variables
	var w = window.innerWidth;
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem('profile'));
	const [loading, setLoading] = useState(true);
	const [itemData, setItemData] = useState({
		nameOfUser: user?.result?.name,
		creator: user?.result?.googleId || user?.result?._id,
		lastUpdated: new Date().toDateString(),
		quantityRemaining: '',
		category: '',
		distributer: '',
		nameOfItem: '',
	});

	//set loading screen
	useEffect(() => {
		setTimeout(() => setLoading(false), 4000);
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

	const distributers = thisUsersSettings[0]?.distributers[0]?.split(', ');
	const categories = thisUsersSettings[0]?.categories[0]?.split(', ');

	//save data entry
	const saveItemData = () => {
		const match = thisUsersItems.filter(
			(item) => item.nameOfItem === itemData.nameOfItem,
		);
		if (match) {
			dispatch(editItem(match._id, { ...itemData }));
		} else {
			dispatch(saveItem({ itemData }));
		}
		alert('Item quantity saved successfully.');
	};

	//FINISH THIS PAGE-- ADD TEXT INPUTS FOR PRODUCT NAME, QUANTITY, PUT ALERT TO CREATE SETTINGS AT TOP OF PAGE, EDIT STYLE

	return (
		<>
			{loading === false ? (
				<>
					{w > 480 ? (
						<div className='inventory-container'>
							<div className='row'>
								<div id='nav-section' className='col-3'>
									<Navbar />
								</div>
								<div className='col-9'>
									<h1 className='dash-heading'>
										Take Inventory
									</h1>
									<hr className='dash-line' />
									<form onSubmit={saveItemData}>
										<p className='quantity'>
											Quantity: <b>{+'%'}</b>
										</p>
										<p className='threshold-info'>
											{thisUsersSettings.length === 0
												? 'Please set your desired distributers, threshold, and categories on the Settings page.'
												: 'Your threshold is currently set to ' +
												  thisUsersSettings[0]
														.threshold +
												  '%.'}
										</p>
										<p>
											Which distributer do you typically
											order this product from?
										</p>
										<select
											name='distributer'
											id='distributer-select'
											onChange={(e) =>
												setItemData({
													...itemData,
													distributer: e.target.value,
												})
											}
										>
											<option selected disabled>
												Select Distributer
											</option>
											{thisUsersSettings[0]?.length ===
											0 ? (
												<option disabled>
													No Distributers Available -
													Set your Distributers on the
													Settings Page.
												</option>
											) : (
												distributers?.map(
													(dist, key) => (
														<option
															key={key}
															value={dist}
														>
															{dist}
														</option>
													),
												)
											)}
										</select>
										<br />
										<p>
											Which category does this product
											belong to?
										</p>
										<select
											name='category'
											id='category-select'
											onChange={(e) =>
												setItemData({
													...itemData,
													category: e.target.value,
												})
											}
										>
											<option selected disabled>
												Select Category
											</option>
											{thisUsersSettings[0]?.length ===
											0 ? (
												<option disabled>
													No Categories Available -
													Set your Categories on the
													Settings Page.
												</option>
											) : (
												categories?.map((cat, key) => (
													<option
														key={key}
														value={cat}
													>
														{cat}
													</option>
												))
											)}
										</select>
										<br />
										<button
											className='save-quantity'
											type='submit'
										>
											Save This Item
										</button>
									</form>
								</div>
							</div>
						</div>
					) : (
						<>
							<Navbar />
							<div className='inventory-container-m'>
								<h1 className='dash-heading-m'>
									Take Inventory
								</h1>
								<hr className='dash-line-m' />
								<div className='take-inventory'>
									<center>
										<form onSubmit={saveItemData}>
											<p className='quantity'>
												Quantity: <b>{+'%'}</b>
											</p>
											<p className='threshold-info'>
												{thisUsersSettings.length === 0
													? 'Please set your desired distributers, threshold, and categories on the Settings page.'
													: 'Your threshold is currently set to ' +
													  thisUsersSettings[0]
															.threshold +
													  '%.'}
											</p>
											<p>
												Which distributer do you
												typically order this product
												from?
											</p>
											<select
												name='distributer'
												id='distributer-select-m'
												onChange={(e) =>
													setItemData({
														...itemData,
														distributer:
															e.target.value,
													})
												}
											>
												<option selected disabled>
													Select Distributer
												</option>
												{thisUsersSettings[0]
													?.length === 0 ? (
													<option disabled>
														No Distributers
														Available - Set your
														Distributers on the
														Settings Page.
													</option>
												) : (
													distributers?.map(
														(dist, key) => (
															<option
																key={key}
																value={dist}
															>
																{dist}
															</option>
														),
													)
												)}
											</select>
											<p>
												Which category does this product
												belong to?
											</p>
											<select
												name='category'
												id='category-select-m'
												onChange={(e) =>
													setItemData({
														...itemData,
														category:
															e.target.value,
													})
												}
											>
												<option selected disabled>
													Select Category
												</option>
												{thisUsersSettings[0]
													?.length === 0 ? (
													<option disabled>
														No Categories Available
														- Set your Categories on
														the Settings Page.
													</option>
												) : (
													categories?.map(
														(cat, key) => (
															<option
																key={key}
																value={cat}
															>
																{cat}
															</option>
														),
													)
												)}
											</select>
											<button
												className='save-quantity-m'
												type='submit'
											>
												Save This Item
											</button>
										</form>
									</center>
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

export default ManualEntry;
