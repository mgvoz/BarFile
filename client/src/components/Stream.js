import React from 'react';

function Stream({ getVideoStream }) {
	return (
		<video
			id='video'
			className='video-view'
			autoPlay
			onCanPlay={getVideoStream()}
		>
			Video stream not available.
		</video>
	);
}

export default Stream;
