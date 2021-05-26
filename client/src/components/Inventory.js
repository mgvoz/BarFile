import React from 'react';
import Navbar from './Navbar';

function Inventory() {
	//set variables
	var w = window.innerWidth;

	//access camera on device and stream
	var canvas = document.getElementById('canvas');
	var video = document.getElementById('video');

	const getVideoStream = () => {
		navigator.mediaDevices
			.getUserMedia({ video: true /*{ facingMode: 'environment' }*/ })
			.then((stream) => {
				document.getElementById('video').srcObject = stream;
			})
			.catch((error) => console.log(error));
	};

	//try to get it to detect from stream or save pic then detect

	const takePic = async () => {
		var context = canvas.getContext('2d');
		await context.drawImage(video, 0, 0, 190, 150);
	};

	let formats;
	window.BarcodeDetector.getSupportedFormats().then((arr) => (formats = arr));
	const barcodeDetector = new window.BarcodeDetector({ formats });

	/*const barcodeDetector = new window.BarcodeDetector({
		formats: [
			'code_128',
			'code_39',
			'code_93',
			'codabar',
			'ean_13',
			'ean_8',
			'itf',
			'upc_a',
			'upc_e',
		],
	});*/

	const findBarcode = () => {
		barcodeDetector
			.detect(document.getElementById('video'))
			.then((data) => {
				console.log(data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	//setInterval(findBarcode, 3000);

	//slider

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
									<canvas id='canvas'></canvas>
									<br />
									<button
										className='pic-btn'
										onClick={takePic}
									>
										Scan Barcode
									</button>
									<div className='set-amt'>
										Use the slider below to represent
										quantity remaining. If the quantity
										remaining is at or below your set
										threshold, this item will be added to
										you order list.
										<div className='btl-img'>
											(bottle shape and slider here)
										</div>
									</div>
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
								<canvas id='canvas'></canvas>
								<button className='pic-btn-m' onClick={takePic}>
									Scan
								</button>
								<div className='set-amt-m'>
									Use the slider below to represent quantity
									remaining. If the quantity remaining is at
									or below your set threshold, this item will
									be added to you order list.
									<div className='btl-img'>
										(bottle shape and slider here)
									</div>
								</div>
							</center>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default Inventory;
