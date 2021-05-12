import React from 'react';
import Navbar from './Navbar';

function Inventory() {
	//access camera on device and stream
	var canvas = document.querySelector('#canvas');
	var video = document.querySelector('video');

	const getVideoStream = () => {
		navigator.mediaDevices
			.getUserMedia({ video: { facingMode: 'environment' } })
			.then((mediaStream) => {
				video.srcObject = mediaStream;
				//video.play();
			})
			.catch((error) => console.log(error));
	};
	const takePic = () => {
		var context = canvas.getContext('2d');
		context.drawImage(video, 0, 0, 640, 480);
	};

	getVideoStream();

	return (
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
								width='640'
								height='480'
								className='video-view'
							></video>
						</center>
						<button onClick={() => takePic}>Take Photo</button>
						<center>
							<canvas
								id='canvas'
								width='640'
								height='480'
							></canvas>
						</center>
						<center>
							<div>
								use the slider below to represent quantity
								remaining
							</div>
						</center>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Inventory;
