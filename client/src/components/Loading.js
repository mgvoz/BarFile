import React from 'react';
import glass from '../images/n855395.png';

function Loading() {
	return (
		<div className='loading-container'>
			<h1>Loading...</h1>
			<img className='glass' src={glass} alt='Loading' />
		</div>
	);
}

export default Loading;
