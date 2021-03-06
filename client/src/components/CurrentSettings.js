import React from 'react';

function CurrentSettings({ settings }) {
	return (
		<div className='current-settings'>
			{settings.length === 0 ? (
				<h5>
					You have no settings yet. Please fill out the form below--
					you'll be able to modify your settings at any time.
				</h5>
			) : (
				<>
					<h5>
						Below are your current settings. You can change them by
						filling out the form below.
					</h5>
					<p id='distributers-set'>
						Distributers: {settings[0]?.distributers}
					</p>
					<p id='threshold-set'>
						Threshold: {settings[0]?.threshold}
					</p>
					<p id='categories-set'>
						Categories: {settings[0]?.categories}
					</p>
				</>
			)}
		</div>
	);
}

export default CurrentSettings;
