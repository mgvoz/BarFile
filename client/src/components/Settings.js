import React, { useState } from 'react';
import Navbar from './Navbar';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSettings, editSettings } from '../actions/settings';

function Settings({ settings, currentSettingId, setCurrentSettingId }) {
	//set variables
	const user = JSON.parse(localStorage.getItem('profile'));
	var w = window.innerWidth;
	const dispatch = useDispatch();
	const history = useHistory();
	const [settingData, setSettingData] = useState({
		nameOfUser: user?.result?.name,
		creator: user?.result?.googleId || user?.result?._id,
		createdAt: new Date().toDateString(),
		distributers: [],
		categories: [],
		threshold: 0,
	});

	//get current user's settings
	const thisUsersSettings = settings.filter(
		(s) =>
			user?.result?.googleId === s?.creator ||
			user?.result?._id === s?.creator,
	);

	//save user setting input
	const saveSettings = (e) => {
		e.preventDefault();
		if (thisUsersSettings.length === 0) {
			dispatch(
				createSettings({
					settingData,
				}),
			);
			setCurrentSettingId(0);
			setSettingData({
				nameOfUser: user?.result?.name,
				creator: user?.result?.googleId || user?.result?._id,
				createdAt: new Date().toDateString(),
				distributers: [],
				categories: [],
				threshold: 0,
			});
			alert('Settings saved!');
			history.push('/settings');
		} else {
			dispatch(
				editSettings(currentSettingId, {
					settingData,
				}),
			);
			setCurrentSettingId(0);
			setSettingData({
				nameOfUser: user?.result?.name,
				creator: user?.result?.googleId || user?.result?._id,
				createdAt: new Date().toDateString(),
				distributers: [],
				categories: [],
				threshold: 0,
			});
			alert('Settings saved!');
			history.push('/settings');
		}
	};

	console.log(settings);
	console.log(thisUsersSettings);
	console.log(settingData);

	//populate text area with current settings if they exist, get settings to save and edit accurately

	return (
		<>
			{w > 480 ? (
				<div className='settings-container'>
					<div className='row'>
						<div id='nav-section' className='col-2'>
							<Navbar />
						</div>
						<div className='col-10'>
							<h1 className='dash-heading'>Settings</h1>
							<hr className='dash-line' />
							<div className='take-inventory'>
								<h4>How will BarFile work for you?</h4>
								<form onSubmit={saveSettings}>
									<label htmlFor='distributers'>
										What distributers do you use to stock
										your bar? List them separated by commas.
									</label>
									<br />
									<textarea
										name='distributers'
										id='settings-textarea'
										cols='30'
										rows='5'
										value={settingData.distributers}
										onChange={(e) =>
											setSettingData({
												...settingData,
												distributers: e.target.value,
											})
										}
									/>
									<br />
									<label htmlFor='threshold'>
										What threshold would you like to use to
										indicate when it's time to reorder?
										(i.e. reorder when inventory for an item
										is 30% or less)
									</label>
									<br />
									<input
										className='threshold-input'
										type='text'
										name='threshold'
										id='settings-textarea'
										value={settingData.threshold}
										onChange={(e) =>
											setSettingData({
												...settingData,
												threshold: e.target.value,
											})
										}
									/>
									%
									<br />
									<label htmlFor='categories'>
										What categories would you like to use to
										organize items for your bar? List them
										separated by commas.
									</label>
									<br />
									<textarea
										name='categories'
										id='settings-textarea'
										cols='30'
										rows='5'
										value={settingData.categories}
										onChange={(e) =>
											setSettingData({
												...settingData,
												categories: e.target.value,
											})
										}
									></textarea>
									<br />
									<button
										className='settings-button-desktop'
										type='submit'
									>
										Save Settings
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			) : (
				<>
					<Navbar />
					<div className='take-inventory'>
						<h1 className='dash-heading-m'>Settings</h1>
						<hr className='dash-line-m' />
						<div>
							<h4 className='setting-subheading'>
								How will BarFile work for you?
							</h4>
							<p>
								You'll be able to modify these settings at any
								time.
							</p>
							<form onSubmit={saveSettings}>
								<label htmlFor='distributers'>
									What distributers do you use to stock your
									bar? List them separated by commas.
								</label>
								<br />
								<textarea
									name='distributers'
									id='settings-textarea'
									cols='30'
									rows='5'
									value={settingData.distributers}
									onChange={(e) =>
										setSettingData({
											...settingData,
											distributers: e.target.value,
										})
									}
								/>
								<br />
								<label htmlFor='threshold'>
									What threshold would you like to use to
									indicate when it's time to reorder? (i.e.
									reorder when inventory for an item is 30% or
									less)
								</label>
								<br />
								<input
									className='threshold-input'
									type='text'
									name='threshold'
									id='settings-textarea'
									value={settingData.threshold}
									onChange={(e) =>
										setSettingData({
											...settingData,
											threshold: e.target.value,
										})
									}
								/>
								%
								<br />
								<label htmlFor='categories'>
									What categories would you like to use to
									organize items for your bar? List them
									separated by commas.
								</label>
								<br />
								<textarea
									name='categories'
									id='settings-textarea'
									cols='30'
									rows='5'
									value={settingData.categories}
									onChange={(e) =>
										setSettingData({
											...settingData,
											categories: e.target.value,
										})
									}
								></textarea>
								<br />
								<button
									className='settings-button'
									type='submit'
								>
									Save Settings
								</button>
							</form>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default Settings;
