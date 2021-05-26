import {
	FETCH_ALL_ITEMS,
	FETCH_ONE_ITEM,
	EDIT_ITEM,
	SAVE_ITEM,
	DELETE_ITEM,
} from '../constants/actionTypes';

const reducers = (items = [], action) => {
	switch (action.type) {
		case FETCH_ALL_ITEMS:
			return action.payload;
		case FETCH_ONE_ITEM:
			return items.map((item) =>
				item._id === action.payload._id ? action.payload : item,
			);
		case SAVE_ITEM:
			return [...items, action.payload];
		case EDIT_ITEM:
			return items.map((item) =>
				item._id === action.payload._id ? action.payload : item,
			);
		case DELETE_ITEM:
			return items.filter((item) => item._id !== action.payload);
		default:
			return items;
	}
};

export default reducers;
