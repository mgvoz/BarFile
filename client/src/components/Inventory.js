import React, { useState } from 'react';
import Navbar from './Navbar';
import { useDispatch } from 'react-redux';
import { saveItem, editItem } from '../actions/inventory';

function Inventory({ items, settings }) {
	/*****************************************************
	- add onChange event to slider to show quantity and add to state
	- add API product lookup to add product name to state
	- add functionality to select individual items and save them with itemData state- replace 'this product' in form with product selected
	 
	******************************************************/

	//set variables
	var w = window.innerWidth;
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem('profile'));
	const [scannedItems, setScannedItems] = useState([]);
	const [itemData, setItemData] = useState({
		nameOfUser: user?.result?.name,
		creator: user?.result?.googleId || user?.result?._id,
		lastUpdated: new Date().toDateString(),
		quantityRemaining: '',
		category: '',
		distributer: '',
		nameOfItem: '',
	});

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

	//access camera on device and stream
	var video = document.getElementById('video');

	const getVideoStream = () => {
		navigator.mediaDevices
			.getUserMedia({ video: true })
			.then((stream) => {
				document.getElementById('video').srcObject = stream;
			})
			.catch((error) => console.log(error));
	};

	//scan barcode from live camera stream
	const barcodeDetector = new window.BarcodeDetector({
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

	const findBarcode = () => {
		barcodeDetector
			.detect(document.getElementById('video'))
			.then((data) => {
				if (data.length > 0) {
					code = data[0].rawValue;
					apiLookup(code);
				}
			})
			.catch((e) => {
				console.log(e);
			});
	};

	//'https://api.apigenius.io/products/lookup?upc=' + code + '&api_key=' + key;
	// titos - 619947000013

	//api barcode lookup
	let code;
	let key = '91990a226f804b428cb02a40c9f5b1d9';
	const apiLookup = (code) => {
		const url =
			'https://api.apigenius.io/products/lookup?upc=' +
			code +
			'&api_key=' +
			key;
		fetch(url, {
			mode: 'no-cors',
			body: JSON.stringify(),
		})
			.then((response) => {
				setScannedItems([
					...scannedItems,
					response.text(), //?.items?.title,
				]);
			})
			.catch((err) => console.log(err));
	};

	setInterval(findBarcode, 2000);

	//slider/form
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

	console.log(itemData);
	console.log(scannedItems);

	return (
		<>
			{w > 480 ? (
				<div className='inventory-container'>
					<div className='row'>
						<div id='nav-section' className='col-3'>
							<Navbar />
						</div>

						<div className='col-9'>
							<h1 className='dash-heading'>Take Inventory</h1>
							<hr className='dash-line' />
							<div className='take-inventory'>
								<p className='barcode-p'>Scan barcode:</p>
								<center>
									<video
										id='video'
										className='video-view'
										autoPlay
										onCanPlay={getVideoStream()}
									>
										Video stream not available.
									</video>
									<p className='barcode-p'>
										Scanned item(s):
									</p>
									<div className='item-info'>
										<ol>
											{scannedItems.map((item, key) => (
												<li
													className='info-text'
													key={key}
												>
													{'  ' + item}
												</li>
											))}
										</ol>
									</div>
									<button
										className='clear-scans'
										onClick={() => setScannedItems([])}
									>
										Clear Scanned Items
									</button>
									<br />
									<div className='set-amt'>
										Click on a scanned item above, and use
										the slider below to represent quantity
										remaining. If the quantity remaining is
										at or below your set threshold, this
										item will be added to you order list.{' '}
										<b>
											Your threshold is currently{' '}
											{thisUsersSettings[0]?.threshold ===
											undefined
												? 'unspecified. Please go to Settings to set your threshold'
												: thisUsersSettings[0]
														?.threshold + '%'}
											.
										</b>
										<div className='btl-img'>
											(bottle shape and slider here,
											onClick of item above, show bottle
											shape, store item info and quatity
											to DB)
										</div>
									</div>
									<form onSubmit={saveItemData}>
										<p className='quantity'>
											Quantity: <b>{+'%'}</b>
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
								</center>
							</div>
						</div>
					</div>
				</div>
			) : (
				<>
					<Navbar />
					<div className='inventory-container-m'>
						<h1 className='dash-heading-m'>Take Inventory</h1>
						<hr className='dash-line-m' />
						<div className='take-inventory'>
							<p className='barcode-p'>Scan barcode:</p>
							<center>
								<video
									id='video'
									className='video-view'
									autoPlay
									onCanPlay={getVideoStream()}
								>
									Video stream not available.
								</video>
								<p className='barcode-p'>Scanned item(s):</p>
								<div className='item-info'>
									<ol>
										{scannedItems.map((item, key) => (
											<li className='info-text' key={key}>
												{'  ' + item}
											</li>
										))}
									</ol>
								</div>
								<button
									className='clear-scans-m'
									onClick={() => setScannedItems([])}
								>
									Clear Scanned Items
								</button>
								<div className='set-amt-m'>
									Click on a scanned item above, and use the
									slider below to represent quantity
									remaining. If the quantity remaining is at
									or below your set threshold, this item will
									be added to you order list.{' '}
									<b>
										Your threshold is currently{' '}
										{thisUsersSettings[0]?.threshold ===
										undefined
											? 'unspecified. Please go to Settings to set your threshold'
											: thisUsersSettings[0]?.threshold +
											  '%'}
										.
									</b>
									<div className='btl-img'>
										(bottle shape and slider here, onClick
										of item above, show bottle shape, store
										item info and quatity to DB)
									</div>
								</div>
								<form onSubmit={saveItemData}>
									<p className='quantity'>
										Quantity: <b>{+'%'}</b>
									</p>
									<p>
										Which distributer do you typically order
										this product from?
									</p>
									<select
										name='distributer'
										id='distributer-select-m'
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
										{thisUsersSettings[0]?.length === 0 ? (
											<option disabled>
												No Distributers Available - Set
												your Distributers on the
												Settings Page.
											</option>
										) : (
											distributers?.map((dist, key) => (
												<option key={key} value={dist}>
													{dist}
												</option>
											))
										)}
									</select>
									<p>
										Which category does this product belong
										to?
									</p>
									<select
										name='category'
										id='category-select-m'
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
										{thisUsersSettings[0]?.length === 0 ? (
											<option disabled>
												No Categories Available - Set
												your Categories on the Settings
												Page.
											</option>
										) : (
											categories?.map((cat, key) => (
												<option key={key} value={cat}>
													{cat}
												</option>
											))
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
	);
}

export default Inventory;
