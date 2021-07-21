import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveItem, editItem } from '../actions/inventory';
import Loading from './Loading';
import bottle from '../images/stock_bottle.png';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

function Inventory() {
	/*****************************************************
	- add onChange event to slider to show quantity and add to state
	 
	******************************************************/

	//set variables
	const dispatch = useDispatch();
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
		image: '',
	});

	//set loading screen
	useEffect(() => {
		setTimeout(() => setLoading(false), 2000);
		setTimeout(() => setWidth(window.innerWidth), 2000);
	}, []);

	//get individual distributers and categories for drop-down menu
	const distributers = settings[0]?.distributers[0]?.split(', ');
	const categories = settings[0]?.categories[0]?.split(', ');

	//access camera on device and stream
	const getVideoStream = () => {
		navigator.mediaDevices
			.getUserMedia({
				video: { facingMode: 'environment' },
			})
			.then((stream) => {
				document.getElementById('video').srcObject = stream;
			})
			.catch((error) => console.log(error));
	};

	//scan barcode from live camera stream
	let code;
	const findBarcode = () => {
		if (
			Boolean(window.BarcodeDetector) === true &&
			document.getElementById('video')
		) {
			var barcodeDetector = new window.BarcodeDetector({
				formats: [
					'ean_13',
					'ean_8',
					'upc_a',
					'upc_e',
					'code_128',
					'code_39',
					'code_93',
					'codabar',
					'itf',
				],
			});

			barcodeDetector
				.detect(document.getElementById('video'))
				.then((data) => {
					if (data.length === 1) {
						code = data[0].rawValue;
						apiLookup(code);
					}
				})
				.catch((e) => {
					console.log(e);
				});
		}
	};

	//api barcode lookup
	let key = '5b2dcf9414984660bc55ab55efb6bcb8';
	const apiLookup = (code) => {
		const url =
			'https://mgcorsproxy.herokuapp.com/https://api.apigenius.io/products/lookup?upc=' +
			code +
			'&api_key=' +
			key;
		fetch(url)
			.then((res) => {
				if (!res.ok) {
					console.log('failure');
				}
				return res.json();
			})
			.then((data) => {
				setItemData({
					...itemData,
					nameOfItem: data.items.title,
					image: data.items.images[0],
					barcode: data.items.upc,
				});
			})
			.catch((err) => console.log(err));
	};

	setInterval(findBarcode, 4000);

	//slider

	// submit form
	const saveItemData = (e) => {
		e.preventDefault();
		if (items.length > 0) {
			const match = items.filter(
				(item) => item.barcode === itemData.barcode,
			);
			if (match.length !== 0) {
				dispatch(editItem(match[0]._id, { ...itemData }));
				alert('Item saved successfully.');
				window.location.reload();
			} else {
				dispatch(saveItem({ itemData }));
				alert('Item saved successfully.');
				window.location.reload();
			}
		} else {
			dispatch(saveItem({ itemData }));
			alert('Item saved successfully.');
			window.location.reload();
		}
	};

	console.log('itemData: ', itemData);

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
									<div className='take-inventory'>
										{Boolean(window.BarcodeDetector) ===
										false ? (
											<p id='message'>
												Barcode detection is not
												supported in your browser. To
												manually enter inventory,{' '}
												<Link
													to='/manual-entry'
													className='manual-link-force'
												>
													click here.
												</Link>
											</p>
										) : (
											<>
												<h3>
													Begin scanning below, or{' '}
													<Link
														to='/manual-entry'
														className='manual-link'
													>
														click here
													</Link>{' '}
													if you'd like to enter
													inventory manually.
												</h3>
												{settings.length === 0 ? (
													<p className='inventory-settings'>
														<b>
															Attention! Please
															set your
															distributers,
															threshold, and
															categories on the
															Settings page before
															taking inventory.
														</b>
													</p>
												) : null}
												<p className='barcode-p'>
													Scan barcode:
												</p>
												<center>
													<video
														id='video'
														className='video-view'
														maxHeight='400px'
														width='30%'
														autoPlay
														onCanPlay={getVideoStream()}
													>
														Video stream not
														available.
													</video>
													<p className='barcode-p'>
														Scanned item:
													</p>
													<div className='item-info'>
														<p>
															{itemData?.nameOfItem !==
															''
																? itemData.nameOfItem
																: 'No item scanned yet.'}
														</p>
													</div>
													<button
														className='clear-scans'
														onClick={() =>
															setItemData({
																nameOfUser:
																	user?.result
																		?.name,
																creator:
																	user?.result
																		?.googleId ||
																	user?.result
																		?._id,
																lastUpdated:
																	new Date().toDateString(),
																quantityRemaining:
																	'',
																category: '',
																distributer: '',
																nameOfItem: '',
																barcode: '',
																image: '',
															})
														}
													>
														Clear Scanned Item
													</button>
													<br />
													<div className='set-amt'>
														{itemData?.image !==
														'' ? (
															<p>
																Use the slider
																below to
																represent
																quantity
																remaining. If
																the quantity
																remaining is at
																or below your
																set threshold,
																this item will
																be added to you
																order list.
															</p>
														) : null}
													</div>
													<div className='btl-img-div'>
														<div className='row align-items-center'>
															<div className='col-6'>
																{itemData?.image !==
																'' ? (
																	<img
																		className='btl-img'
																		src={
																			itemData.image ===
																			undefined
																				? bottle
																				: itemData.image
																		}
																		alt='Scanned item image'
																	/>
																) : null}
															</div>
															<div className='col-6'>
																<Slider
																	vertical={
																		true
																	}
																	min={0}
																	max={100}
																	step={1}
																	onChange={(
																		value,
																	) =>
																		console.log(
																			value,
																		)
																	}
																/>
															</div>
														</div>
													</div>
													{itemData.nameOfItem !==
													'' ? (
														<form
															onSubmit={
																saveItemData
															}
														>
															<p className='quantity'>
																Quantity:{' '}
																<b>{''}</b>
															</p>
															<p className='threshold-info'>
																{settings.length ===
																0
																	? 'Please set your desired distributers, threshold, and categories on the Settings page.'
																	: 'Your threshold is currently set to ' +
																	  settings[0]
																			.threshold +
																	  '.'}
															</p>
															<p>
																Which
																distributer do
																you typically
																order this
																product from?
															</p>
															<select
																name='distributer'
																id='distributer-select'
																required
																onChange={(e) =>
																	setItemData(
																		{
																			...itemData,
																			distributer:
																				e
																					.target
																					.value,
																		},
																	)
																}
															>
																<option
																	selected
																	disabled
																>
																	Select
																	Distributer
																</option>
																{settings[0]
																	?.length ===
																0 ? (
																	<option
																		disabled
																	>
																		No
																		Distributers
																		Available
																		- Set
																		your
																		Distributers
																		on the
																		Settings
																		Page.
																	</option>
																) : (
																	distributers?.map(
																		(
																			dist,
																			key,
																		) => (
																			<option
																				key={
																					key
																				}
																				value={
																					dist
																				}
																			>
																				{
																					dist
																				}
																			</option>
																		),
																	)
																)}
															</select>
															<br />
															<p>
																Which category
																does this
																product belong
																to?
															</p>
															<select
																name='category'
																id='category-select'
																required
																onChange={(e) =>
																	setItemData(
																		{
																			...itemData,
																			category:
																				e
																					.target
																					.value,
																		},
																	)
																}
															>
																<option
																	selected
																	disabled
																>
																	Select
																	Category
																</option>
																{settings[0]
																	?.length ===
																0 ? (
																	<option
																		disabled
																	>
																		No
																		Categories
																		Available
																		- Set
																		your
																		Categories
																		on the
																		Settings
																		Page.
																	</option>
																) : (
																	categories?.map(
																		(
																			cat,
																			key,
																		) => (
																			<option
																				key={
																					key
																				}
																				value={
																					cat
																				}
																			>
																				{
																					cat
																				}
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
													) : null}
												</center>
											</>
										)}
									</div>
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
									{Boolean(window.BarcodeDetector) ===
									false ? (
										<p id='message'>
											Barcode detection is not supported
											in your browser. To manually enter
											inventory,{' '}
											<Link
												to='/manual-entry'
												className='manual-link-force'
											>
												click here.
											</Link>
										</p>
									) : (
										<>
											<h3>
												Begin scanning below, or{' '}
												<Link
													to='/manual-entry'
													className='manual-link'
												>
													click here
												</Link>{' '}
												if you'd like to enter inventory
												manually.
											</h3>
											{settings.length === 0 ? (
												<center>
													<p className='inventory-settings'>
														<b>
															Attention! Please
															set your
															distributers,
															threshold, and
															categories on the
															Settings page before
															taking inventory.
														</b>
													</p>
												</center>
											) : null}
											<p className='barcode-p'>
												Scan barcode:
											</p>
											<center>
												<video
													id='video'
													className='video-view'
													height='300px'
													width='90%'
													autoPlay
													playsInline
													onCanPlay={getVideoStream()}
												>
													Video stream not available.
												</video>
												<p className='barcode-p'>
													Scanned item:
												</p>
												<div className='item-info'>
													<p>
														{itemData?.nameOfItem !==
														''
															? itemData.nameOfItem
															: 'No item scanned yet.'}
													</p>
												</div>
												<button
													className='clear-scans'
													onClick={() =>
														setItemData({
															nameOfUser:
																user?.result
																	?.name,
															creator:
																user?.result
																	?.googleId ||
																user?.result
																	?._id,
															lastUpdated:
																new Date().toDateString(),
															quantityRemaining:
																'',
															category: '',
															distributer: '',
															nameOfItem: '',
															barcode: '',
															image: '',
														})
													}
												>
													Clear Scanned Item
												</button>
												<div className='set-amt-m'>
													{itemData?.image !== '' ? (
														<p>
															Use the slider below
															to represent
															quantity remaining.
															If the quantity
															remaining is at or
															below your set
															threshold, this item
															will be added to you
															order list.
														</p>
													) : null}
												</div>
												<div className='btl-img-div'>
													<div className='row align-items-center'>
														<div className='col-6'>
															{itemData?.image !==
															'' ? (
																<img
																	className='btl-img'
																	src={
																		itemData.image ===
																		undefined
																			? bottle
																			: itemData.image
																	}
																	alt='Scanned item image'
																/>
															) : null}
														</div>
														<div className='col-6'>
															<Slider
																vertical
																min={0}
																max={100}
																onChange={(
																	value,
																) =>
																	console.log(
																		value,
																	)
																}
															/>
														</div>
													</div>
												</div>
												{itemData.nameOfItem !== '' ? (
													<form
														onSubmit={saveItemData}
													>
														<p className='quantity'>
															Quantity:{' '}
															<b>{''}</b>
														</p>
														<p className='threshold-info-m'>
															{settings.length ===
															0
																? 'Please set your desired distributers, threshold, and categories on the Settings page.'
																: 'Your threshold is currently set to ' +
																  settings[0]
																		.threshold +
																  '.'}
														</p>
														<p>
															Which distributer do
															you typically order
															this product from?
														</p>
														<select
															name='distributer'
															id='distributer-select-m'
															required
															onChange={(e) =>
																setItemData({
																	...itemData,
																	distributer:
																		e.target
																			.value,
																})
															}
														>
															<option
																selected
																disabled
															>
																Select
																Distributer
															</option>
															{settings[0]
																?.length ===
															0 ? (
																<option
																	disabled
																>
																	No
																	Distributers
																	Available -
																	Set your
																	Distributers
																	on the
																	Settings
																	Page.
																</option>
															) : (
																distributers?.map(
																	(
																		dist,
																		key,
																	) => (
																		<option
																			key={
																				key
																			}
																			value={
																				dist
																			}
																		>
																			{
																				dist
																			}
																		</option>
																	),
																)
															)}
														</select>
														<p>
															Which category does
															this product belong
															to?
														</p>
														<select
															name='category'
															id='category-select-m'
															required
															onChange={(e) =>
																setItemData({
																	...itemData,
																	category:
																		e.target
																			.value,
																})
															}
														>
															<option
																selected
																disabled
															>
																Select Category
															</option>
															{settings[0]
																?.length ===
															0 ? (
																<option
																	disabled
																>
																	No
																	Categories
																	Available -
																	Set your
																	Categories
																	on the
																	Settings
																	Page.
																</option>
															) : (
																categories?.map(
																	(
																		cat,
																		key,
																	) => (
																		<option
																			key={
																				key
																			}
																			value={
																				cat
																			}
																		>
																			{
																				cat
																			}
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
												) : null}
											</center>
										</>
									)}
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

export default Inventory;
