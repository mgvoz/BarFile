import { combineReducers } from 'redux';
import auth from './auth';
import settings from './settings';
import items from './items';

export const reducers = combineReducers({ auth, settings, items });
