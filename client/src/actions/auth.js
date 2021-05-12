import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

export const signin = (userData, router) => async (dispatch) => {
	try {
		const { data } = await api.signIn(userData);

		dispatch({ type: AUTH, data });

		router.push('/dashboard');
	} catch (error) {
		console.log(error);
	}
};

export const signup = (userData, router) => async (dispatch) => {
	try {
		const { data } = await api.signUp(userData);

		dispatch({ type: AUTH, data });

		router.push('/dashboard');
	} catch (error) {
		console.log(error);
	}
};
