import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });
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
