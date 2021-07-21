import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Loading from './Loading';
import { useDispatch, useSelector } from 'react-redux';
import { saveItem, editItem } from '../actions/inventory';
import { useHistory } from 'react-router-dom';

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
									<center>
										{settings.length === 0 ? (
											<p className='inventory-settings'>
												<b>
													Attention! Please set your
													distributers, threshold, and
													categories on the Settings
													page before taking
													inventory.
												</b>
											</p>
										) : null}
										<div className='take-inventory'>
											<form
												className='manual-form'
												onSubmit={saveItemData}
											>
												<label htmlFor='product'>
													Product name:
												</label>
												<br />
												<input
													name='product'
													type='text'
													id='product-entry'
													required
													value={itemData.nameOfItem}
													onChange={(e) =>
														setItemData({
															...itemData,
															nameOfItem:
																e.target.value,
														})
													}
												/>
												<br />
												<label htmlFor='barcode'>
													Barcode:
												</label>
												<br />
												<input
													name='barcode'
													type='text'
													id='barcode-entry'
													required
													value={itemData.barcode}
													onChange={(e) =>
														setItemData({
															...itemData,
															barcode:
																e.target.value,
														})
													}
												/>
												<br />
												<label htmlFor='quantity'>
													Quantity remaining:
												</label>
												<br />
												<input
													name='quantity'
													type='text'
													id='quantity-entry'
													required
													value={
														itemData.quantityRemaining
													}
													onChange={(e) =>
														setItemData({
															...itemData,
															quantityRemaining:
																e.target.value,
														})
													}
												/>
												<br />
												<p className='threshold-info'>
													{settings.length === 0
														? 'Please set your desired distributers, threshold, and categories on the Settings page.'
														: 'Your threshold is currently set to ' +
														  settings[0]
																.threshold +
														  '.'}
												</p>
												<p>
													Which distributer do you
													typically order this product
													from?
												</p>
												<select
													name='distributer'
													id='distributer-select'
													required
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
													{settings[0]?.length ===
													0 ? (
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
												<br />
												<p>
													Which category does this
													product belong to?
												</p>
												<select
													name='category'
													id='category-select'
													required
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
													{settings[0]?.length ===
													0 ? (
														<option disabled>
															No Categories
															Available - Set your
															Categories on the
															Settings Page.
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
												<br />
												<button
													className='save-quantity'
													type='submit'
												>
													Save This Item
												</button>
											</form>
										</div>
									</center>
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
								{settings.length === 0 ? (
									<center>
										<p className='inventory-settings'>
											<b>
												Attention! Please set your
												distributers, threshold, and
												categories on the Settings page
												before taking inventory.
											</b>
										</p>
									</center>
								) : null}
								<div className='take-inventory'>
									<center>
										<form
											className='manual-form'
											onSubmit={saveItemData}
										>
											<label htmlFor='product'>
												Product name:
											</label>
											<br />
											<input
												name='product'
												type='text'
												id='product-entry-m'
												required
												value={itemData.nameOfItem}
												onChange={(e) =>
													setItemData({
														...itemData,
														nameOfItem:
															e.target.value,
													})
												}
											/>
											<br />
											<label htmlFor='barcode'>
												Barcode:
											</label>
											<br />
											<input
												name='barcode'
												type='text'
												id='barcode-entry-m'
												required
												value={itemData.barcode}
												onChange={(e) =>
													setItemData({
														...itemData,
														barcode: e.target.value,
													})
												}
											/>
											<br />
											<label htmlFor='quantity'>
												Quantity remaining:
											</label>
											<br />
											<input
												name='quantity'
												type='text'
												id='product-entry-m'
												required
												value={
													itemData.quantityRemaining
												}
												onChange={(e) =>
													setItemData({
														...itemData,
														quantityRemaining:
															e.target.value,
													})
												}
											/>
											<br />
											<p className='threshold-info-m'>
												{settings.length === 0
													? 'Please set your desired distributers, threshold, and categories on the Settings page.'
													: 'Your threshold is currently set to ' +
													  settings[0].threshold +
													  '.'}
											</p>
											<p>
												Which distributer do you
												typically order this product
												from?
											</p>
											<select
												name='distributer'
												id='distributer-select-m'
												required
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
												{settings[0]?.length === 0 ? (
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
												required
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
												{settings[0]?.length === 0 ? (
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
