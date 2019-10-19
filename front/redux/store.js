import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { createStore, applyMiddleware } from 'redux';

import reducer from './reducer';

const loggerMiddleware = createLogger();

const store = createStore(
	reducer,
	applyMiddleware(
		thunkMiddleware,
		loggerMiddleware
	)
);

export default store;