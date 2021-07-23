import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveItem, editItem } from '../../actions/inventory';
import Loading from '../Loading';
import InventoryDesktop from './InventoryDesktop';
import InventoryMobile from './InventoryMobile';

function Inventory() {
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
	const [turnGreen, setTurnGreen] = useState('');
	const [sliderQuantity, setSliderQuantity] = useState(0);
	const [bottleQuantity, setBottleQuantity] = useState(0);
	const [itemData, setItemData] = useState({
		nameOfUser: user?.result?.name,
		creator: user?.result?.googleId || user?.result?._id,
		lastUpdated: new Date().toDateString(),
		quantityRemaining: 0,
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
						setTurnGreen('border: "2px solid green"');
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
	let key = '4d43fce807834d508faa6b95347a3055';
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

	return (
		<>
			{loading === false ? (
				<>
					{width >= 1000 ? (
						<InventoryDesktop
							settings={settings}
							user={user}
							bottleQuantity={bottleQuantity}
							setBottleQuantity={setBottleQuantity}
							sliderQuantity={sliderQuantity}
							setSliderQuantity={setSliderQuantity}
							distributers={distributers}
							categories={categories}
							getVideoStream={getVideoStream}
							saveItemData={saveItemData}
							itemData={itemData}
							setItemData={setItemData}
							turnGreen={turnGreen}
						/>
					) : (
						<InventoryMobile
							settings={settings}
							user={user}
							bottleQuantity={bottleQuantity}
							setBottleQuantity={setBottleQuantity}
							sliderQuantity={sliderQuantity}
							setSliderQuantity={setSliderQuantity}
							distributers={distributers}
							categories={categories}
							getVideoStream={getVideoStream}
							saveItemData={saveItemData}
							itemData={itemData}
							setItemData={setItemData}
							turnGreen={turnGreen}
						/>
					)}
				</>
			) : (
				<Loading />
			)}
		</>
	);
}

export default Inventory;
