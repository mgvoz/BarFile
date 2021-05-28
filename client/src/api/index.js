import axios from 'axios';

const API = axios.create({ baseURL: 'https://barfile.herokuapp.com' });
API.interceptors.request.use((req) => {
	if (localStorage.getItem('profile')) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem('profile')).token
		}`;
	}
	return req;
});

//auth
export const signIn = (userData) => API.post('/users/signin', userData);
export const signUp = (userData) => API.post('/users/signup', userData);

//settings
export const getSettings = () => API.get('/settings');
export const getOneSetting = (id) => API.get(`/settings/${id}`);
export const createSettings = (newSetting) => API.post('/settings', newSetting);
export const editSettings = (id, updatedSetting) =>
	API.patch(`/settings/${id}`, updatedSetting);
export const deleteSetting = (id) => API.delete(`/settings/${id}`);

//items
export const getItems = () => API.get('/items');
export const getOneItem = (id) => API.get(`/items/${id}`);
export const saveItem = (newItem) => API.post('/items', newItem);
export const editItem = (id, updatedItem) =>
	API.patch(`/items/${id}`, updatedItem);
export const deleteItem = (id) => API.delete(`/items/${id}`);
