import * as api from '../api';
import {
	FETCH_ALL_SETTINGS,
	FETCH_ONE_SETTING,
	CREATE_SETTINGS,
	EDIT_SETTINGS,
	DELETE_SETTING,
} from '../constants/actionTypes';

export const getSettings = () => async (dispatch) => {
	try {
		const { data } = await api.getSettings();
		dispatch({ type: FETCH_ALL_SETTINGS, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const getOneSetting = (id) => async (dispatch) => {
	try {
		const { data } = await api.getOneSetting();
		dispatch({ type: FETCH_ONE_SETTING, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const createSettings = (setting) => async (dispatch) => {
	try {
		const { data } = await api.createSettings(setting);
		dispatch({ type: CREATE_SETTINGS, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const editSettings = (id, setting) => async (dispatch) => {
	try {
		const { data } = await api.editSettings(id, setting);
		dispatch({ type: EDIT_SETTINGS, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const deleteSetting = (id) => async (dispatch) => {
	try {
		await api.deleteSetting(id);
		dispatch({ type: DELETE_SETTING, payload: id });
	} catch (error) {
		console.log(error);
	}
};
