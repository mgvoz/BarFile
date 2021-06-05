import React from 'react';
import glass from '../images/n855395.png';
import logo from '../images/twitter_header_photo_2.png';

function Loading() {
	//FIX LOGO FOR LOADING PAGE- REDESIGN?

	return (
		<>
			<img src={logo} alt='Barfile Logo' />
			<div className='loading-container'>
				<h1>Loading...</h1>
				<img className='glass' src={glass} alt='Loading' />
			</div>
		</>
	);
}

export default Loading;
