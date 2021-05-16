import { combineReducers } from 'redux';
import auth from './auth';
import settings from './settings';

export const reducers = combineReducers({ auth, settings });
