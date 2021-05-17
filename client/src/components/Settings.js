import React, { useState } from 'react';
import Navbar from './Navbar';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	createSettings,
	editSettings,
	deleteSetting,
} from '../actions/settings';

function Settings({ settings }) {
	//set variables
	const user = JSON.parse(localStorage.getItem('profile'));
	var w = window.innerWidth;
	const dispatch = useDispatch();
	const history = useHistory();

	//get current user's settings
	const thisUsersSettings = settings.filter(
		(s) =>
			user?.result?.googleId === s?.creator ||
			user?.result?._id === s?.creator,
	);

	//state to gather settings data
	const [settingData, setSettingData] = useState({
		nameOfUser: user?.result?.name,
		creator: user?.result?.googleId || user?.result?._id,
		createdAt: new Date().toDateString(),
		distributers:
			thisUsersSettings.length > 0
				? thisUsersSettings[0].distributers
				: [],
		categories:
			thisUsersSettings.length > 0 ? thisUsersSettings[0].categories : [],
		threshold:
			thisUsersSettings.length > 0 ? thisUsersSettings[0].threshold : '',
	});

	console.log(thisUsersSettings);
	console.log(settingData);

	//save user setting input
	//MAKE IT SO ONLY 1 CAN BE UPDATED AND KEEP THE REST THE SAME
	const saveSettings = () => {
		if (thisUsersSettings.length > 0) {
			dispatch(
				editSettings(thisUsersSettings[0]._id, {
					...settingData,
				}),
			);
			alert('Settings saved!');
			history.push('/settings');
		} else {
			dispatch(
				createSettings({
					settingData,
				}),
			);
			alert('Settings saved!');
			history.push('/settings');
		}
	};

	//clear user's settings completely
	const clearSettings = () => {
		if (thisUsersSettings.length > 0) {
			dispatch(deleteSetting(thisUsersSettings[0]?._id));
			alert('Settings cleared!');
		} else if (thisUsersSettings.length === 0) {
			alert('No settings created yet.');
		}
	};

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
								<p>
									You'll be able to modify these settings at
									any time.
								</p>
								<form onSubmit={saveSettings}>
									<label htmlFor='distributers'>
										What <b>distributers</b> do you use to
										stock your bar? List them separated by
										commas.
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
										placeholder={
											thisUsersSettings.length > 0
												? thisUsersSettings[0]
														.distributers
												: null
										}
									/>
									<br />
									<label htmlFor='threshold'>
										What <b>threshold</b> would you like to
										use to indicate when it's time to
										reorder? (i.e. reorder when inventory
										for an item is 30% or less)
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
										placeholder={
											thisUsersSettings.length > 0
												? thisUsersSettings[0].threshold
												: null
										}
									/>
									%
									<br />
									<label htmlFor='categories'>
										What <b>categories</b> would you like to
										use to organize items for your bar? List
										them separated by commas.
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
										placeholder={
											thisUsersSettings.length > 0
												? thisUsersSettings[0]
														.categories
												: null
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
								<button
									className='settings-button-desktop'
									id='clear-settings-btn'
									onClick={clearSettings}
								>
									Clear All Settings
								</button>
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
									What <b>distributers</b> do you use to stock
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
									placeholder={
										thisUsersSettings.length > 0
											? thisUsersSettings[0].distributers
											: null
									}
								/>
								<br />
								<label htmlFor='threshold'>
									What <b>threshold</b> would you like to use
									to indicate when it's time to reorder? (i.e.
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
									placeholder={
										thisUsersSettings.length > 0
											? thisUsersSettings[0].threshold
											: null
									}
								/>
								%
								<br />
								<label htmlFor='categories'>
									What <b>categories</b> would you like to use
									to organize items for your bar? List them
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
									placeholder={
										thisUsersSettings.length > 0
											? thisUsersSettings[0].categories
											: null
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
							<button
								className='settings-button'
								id='clear-settings-btn-m'
								onClick={clearSettings}
							>
								Clear All Settings
							</button>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default Settings;
