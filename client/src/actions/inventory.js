import * as api from '../api';
import {
	FETCH_ALL_ITEMS,
	FETCH_ONE_ITEM,
	SAVE_ITEM,
	EDIT_ITEM,
	DELETE_ITEM,
} from '../constants/actionTypes';

export const getItems = () => async (dispatch) => {
	try {
		const { data } = await api.getItems();
		dispatch({ type: FETCH_ALL_ITEMS, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const getOneItem = (id) => async (dispatch) => {
	try {
		const { data } = await api.getOneItem();
		dispatch({ type: FETCH_ONE_ITEM, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const saveItem = (item) => async (dispatch) => {
	try {
		const { data } = await api.saveItem(item);
		dispatch({ type: SAVE_ITEM, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const editItem = (id, item) => async (dispatch) => {
	try {
		const { data } = await api.editItem(id, item);
		dispatch({ type: EDIT_ITEM, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const deleteItem = (id) => async (dispatch) => {
	try {
		await api.deleteItem(id);
		dispatch({ type: DELETE_ITEM, payload: id });
	} catch (error) {
		console.log(error);
	}
};
