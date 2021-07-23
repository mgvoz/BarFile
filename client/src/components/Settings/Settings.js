import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	createSettings,
	editSettings,
	deleteSetting,
} from '../../actions/settings';
import Loading from '../Loading';
import SettingsDesktop from './SettingsDesktop';
import SettingsMobile from './SettingsMobile';

function Settings() {
	//set variables
	const user = JSON.parse(localStorage.getItem('profile'));
	const dispatch = useDispatch();
	const history = useHistory();
	const [width, setWidth] = useState(0);
	const [loading, setLoading] = useState(true);
	const [settingData, setSettingData] = useState({});
	const settings = useSelector((state) =>
		state.settings.filter(
			(s) =>
				user?.result?.googleId === s?.creator ||
				user?.result?._id === s?.creator,
		),
	);

	//set loading screen
	useEffect(() => {
		setTimeout(() => setLoading(false), 2000);
		setTimeout(() => setWidth(window.innerWidth), 2000);
	}, []);

	//state to gather settings data
	useEffect(() => {
		var timeOut = setTimeout(
			() =>
				setSettingData({
					nameOfUser: user?.result?.name,
					creator: user?.result?.googleId || user?.result?._id,
					createdAt: new Date().toDateString(),
					distributers: settings[0]?.distributers,
					categories: settings[0]?.categories,
					threshold: settings[0]?.threshold,
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
		if (settings.length > 0) {
			dispatch(
				editSettings(settings[0]._id, {
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
		if (settings.length > 0) {
			dispatch(deleteSetting(settings[0]?._id));
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
					{width >= 1000 ? (
						<SettingsDesktop
							settings={settings}
							saveSettings={saveSettings}
							clearSettings={clearSettings}
							settingData={settingData}
							setSettingData={setSettingData}
						/>
					) : (
						<SettingsMobile
							settings={settings}
							saveSettings={saveSettings}
							settingData={settingData}
							setSettingData={setSettingData}
						/>
					)}
				</>
			) : (
				<Loading />
			)}
		</>
	);
}

export default Settings;
