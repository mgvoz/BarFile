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
			.getUserMedia({ video: { facingMode: 'environment' } })
			.then((stream) => {
				video.srcObject = stream;
			})
			.catch((error) => console.log(error));
	};
	const takePic = () => {
		var context = canvas.getContext('2d');
		context.drawImage(video, 0, 0, 190, 150);
		trial();
	};

	const trial = async () => {
		const barcodeDetector = new window.BarcodeDetector({
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
		});
		try {
			const barcodes = await barcodeDetector.detect(canvas);
			console.log(barcodes.rawValue);
		} catch (e) {
			console.error('Barcode detection failed:', e);
		}
	};

	getVideoStream();

	return (
		<>
			{w > 480 ? (
				<div className='inventory-container'>
					<div className='row'>
						<div id='nav-section' className='col-2'>
							<Navbar />
						</div>

						<div className='col-10'>
							<h1 className='dash-heading'>Take Inventory</h1>
							<hr className='dash-line' />
							<div className='take-inventory'>
								<p className='barcode-p'>Scan barcode:</p>
								<center>
									<video
										id='video'
										className='video-view'
										autoPlay
									>
										Video stream not available.
									</video>
									<canvas id='canvas'></canvas>
									<br />
									<button
										className='pic-btn'
										onClick={takePic}
									>
										Take Photo
									</button>
									<div className='set-amt'>
										Use the slider below to represent
										quantity remaining.
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
								>
									Video stream not available.
								</video>
								<canvas id='canvas'></canvas>
								<button className='pic-btn-m' onClick={takePic}>
									Take Photo
								</button>
								<div className='set-amt-m'>
									Use the slider below to represent quantity
									remaining.
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
