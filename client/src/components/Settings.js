import React, { useState, useEffect, Suspense } from 'react';
import Navbar from './Navbar';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	createSettings,
	editSettings,
	deleteSetting,
} from '../actions/settings';
import Loading from './Loading';
const CurrentSettings = React.lazy(() => import('./CurrentSettings'));

function Settings({ settings }) {
	//set variables
	const user = JSON.parse(localStorage.getItem('profile'));
	var w = window.innerWidth;
	const dispatch = useDispatch();
	const history = useHistory();
	const [loading, setLoading] = useState(true);
	const [settingData, setSettingData] = useState({});

	//set loading screen
	useEffect(() => {
		setTimeout(() => setLoading(false), 4000);
	}, []);

	//get current user's settings
	const thisUsersSettings = settings.filter(
		(s) =>
			user?.result?.googleId === s?.creator ||
			user?.result?._id === s?.creator,
	);

	//state to gather settings data
	useEffect(() => {
		var timeOut = setTimeout(
			() =>
				setSettingData({
					nameOfUser: user?.result?.name,
					creator: user?.result?.googleId || user?.result?._id,
					createdAt: new Date().toDateString(),
					distributers: thisUsersSettings[0]?.distributers,
					categories: thisUsersSettings[0]?.categories,
					threshold: thisUsersSettings[0]?.threshold,
				}),
			1000,
		);
		return () => {
			clearTimeout(timeOut);
		};
	}, [loading]);

	//save user setting input
	const saveSettings = (e) => {
		e.preventDefault();
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
			setSettingData({});
			alert('Settings cleared!');
		} else {
			alert('No settings created yet.');
		}
	};

	return (
		<>
			{loading === false ? (
				<>
					{w > 480 ? (
						<div className='settings-container'>
							<div className='row'>
								<div id='nav-section' className='col-3'>
									<Navbar />
								</div>
								<div className='col-9'>
									<h1 className='dash-heading'>Settings</h1>
									<hr className='dash-line' />
									<div className='take-inventory'>
										<h3>How will BarFile work for you?</h3>
										<Suspense
											fallback={
												<div>Loading Settings...</div>
											}
										>
											<CurrentSettings
												thisUsersSettings={
													thisUsersSettings
												}
											/>
										</Suspense>
										<form onSubmit={saveSettings}>
											<label htmlFor='distributers'>
												What <b>distributers</b> do you
												use to stock your bar? List them
												separated by commas.
											</label>
											<br />
											<textarea
												name='distributers'
												id='settings-textarea'
												cols='30'
												rows='5'
												placeholder='...'
												value={settingData.distributers}
												onChange={(e) =>
													setSettingData({
														...settingData,
														distributers:
															e.target.value,
													})
												}
											/>
											<br />
											<label htmlFor='threshold'>
												What <b>threshold</b> would you
												like to use to indicate when
												it's time to reorder? (i.e.
												reorder when inventory for an
												item is 30% or less)
											</label>
											<br />
											<input
												className='threshold-input'
												type='text'
												name='threshold'
												id='settings-textarea'
												placeholder='...'
												value={settingData.threshold}
												onChange={(e) =>
													setSettingData({
														...settingData,
														threshold:
															e.target.value,
													})
												}
											/>
											%
											<br />
											<label htmlFor='categories'>
												What <b>categories</b> would you
												like to use to organize items
												for your bar? List them
												separated by commas.
											</label>
											<br />
											<textarea
												name='categories'
												id='settings-textarea'
												cols='30'
												rows='5'
												placeholder='...'
												value={settingData.categories}
												onChange={(e) =>
													setSettingData({
														...settingData,
														categories:
															e.target.value,
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
										<button
											className='settings-button-desktop'
											id='clear-settings-btn'
											onClick={(e) => {
												e.preventDefault();
												clearSettings();
												window.location.reload();
											}}
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
									<h3>How will BarFile work for you?</h3>
									<Suspense
										fallback={
											<div>Loading Settings...</div>
										}
									>
										<CurrentSettings
											thisUsersSettings={
												thisUsersSettings
											}
										/>
									</Suspense>
									<form onSubmit={saveSettings}>
										<label htmlFor='distributers'>
											What <b>distributers</b> do you use
											to stock your bar? List them
											separated by commas.
										</label>
										<br />
										<textarea
											name='distributers'
											id='settings-textarea'
											cols='30'
											rows='5'
											placeholder='...'
											value={settingData.distributers}
											onChange={(e) =>
												setSettingData({
													...settingData,
													distributers:
														e.target.value,
												})
											}
										/>
										<br />
										<label htmlFor='threshold'>
											What <b>threshold</b> would you like
											to use to indicate when it's time to
											reorder? (i.e. reorder when
											inventory for an item is 30% or
											less)
										</label>
										<br />
										<input
											className='threshold-input'
											type='text'
											name='threshold'
											id='settings-textarea'
											placeholder='...'
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
											What <b>categories</b> would you
											like to use to organize items for
											your bar? List them separated by
											commas.
										</label>
										<br />
										<textarea
											name='categories'
											id='settings-textarea'
											cols='30'
											rows='5'
											placeholder='...'
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
									<button
										className='settings-button'
										id='clear-settings-btn-m'
										onClick={() => {
											dispatch(
												deleteSetting(
													thisUsersSettings[0]?._id,
												),
											)
												.then(() => {
													setSettingData({});
													alert('Settings cleared!');
												})
												.then(() =>
													window.location.reload(),
												);
										}}
									>
										Clear All Settings
									</button>
								</div>
							</div>
						</>
					)}
				</>
			) : (
				<Loading />
			)}
		</>
	);
}

export default Settings;
