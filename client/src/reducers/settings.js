import {
	FETCH_ALL_SETTINGS,
	FETCH_ONE_SETTING,
	EDIT_SETTINGS,
	CREATE_SETTINGS,
	DELETE_SETTING,
} from '../constants/actionTypes';

const reducers = (settings = [], action) => {
	switch (action.type) {
		case FETCH_ALL_SETTINGS:
			return action.payload;
		case FETCH_ONE_SETTING:
			return settings.map((setting) =>
				setting._id === action.payload._id ? action.payload : setting,
			);
		case CREATE_SETTINGS:
			return [...settings, action.payload];
		case EDIT_SETTINGS:
			return settings.map((setting) =>
				setting._id === action.payload._id ? action.payload : setting,
			);
		case DELETE_SETTING:
			return settings.filter((setting) => setting._id !== action.payload);
		default:
			return settings;
	}
};

export default reducers;
