import React, { Suspense } from 'react';
import Navbar from '../Navbar/Navbar';
import { useDispatch } from 'react-redux';
import { deleteSetting } from '../../actions/settings';
const CurrentSettings = React.lazy(() => import('../CurrentSettings'));

function SettingsMobile({
	settings,
	saveSettings,
	settingData,
	setSettingData,
}) {
	const dispatch = useDispatch();
	return (
		<>
			<Navbar />
			<div className='take-inventory'>
				<h1 className='dash-heading-m'>Settings</h1>
				<hr className='dash-line-m' />
				<div>
					<h3>How will BarFile work for you?</h3>
					<Suspense fallback={<div>Loading Settings...</div>}>
						<CurrentSettings settings={settings} />
					</Suspense>
					<form onSubmit={saveSettings}>
						<label htmlFor='distributers'>
							What <b>distributers</b> do you use to stock your
							bar? List them separated by commas.
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
									distributers: e.target.value,
								})
							}
						/>
						<br />
						<label htmlFor='threshold'>
							What <b>threshold</b> would you like to use to
							indicate when it's time to reorder? (i.e. reorder
							when inventory for an item is 0.3 or less)
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
						<br />
						<label htmlFor='categories'>
							What <b>categories</b> would you like to use to
							organize items for your bar? List them separated by
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
						<button className='settings-button' type='submit'>
							Save Settings
						</button>
					</form>
					<button
						className='settings-button'
						id='clear-settings-btn-m'
						onClick={() => {
							dispatch(deleteSetting(settings[0]?._id))
								.then(() => {
									setSettingData({});
									alert('Settings cleared!');
								})
								.then(() => window.location.reload());
						}}
					>
						Clear All Settings
					</button>
				</div>
			</div>
		</>
	);
}

export default SettingsMobile;
