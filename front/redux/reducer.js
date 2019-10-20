import {
    ADD_DATA_POINT, 

    GET_LOCATION_START,
    GET_LOCATION_FAIL,
    GET_LOCATION_SUCCESS,

    WATCH_LOCATION_START, 
    WATCH_LOCATION_FAIL, 
    WATCH_LOCATION_SUCCESS,
    BACKGROUND_LOCATION_UPDATE,
    ADD_DATA_SELECTION
} from './actions';

import { combineReducers } from 'redux';


const merge = (prev, next) => Object.assign({}, prev, next);


const DEFAULT_USER_DATA = {}

const userDataReducer = (state = DEFAULT_USER_DATA, action) => {
    switch(action.type) {
        case ADD_DATA_POINT:
            return Object.assign({}, state.data, {...action.payload});
        default:
            return state;
    }
}

const DEFAULT_LOCATION_STATE = {
    coordinate: {},
	isFetching: false,
	didFail: false,
	error: ''
}

const locationReducer = (state = DEFAULT_LOCATION_STATE, action) => {
	switch(action.type) {
		case GET_LOCATION_START:
        case WATCH_LOCATION_START:
			return merge(state, {isFetching: true, didFail: false, error: ''})
		case GET_LOCATION_FAIL:
        case WATCH_LOCATION_FAIL:
			return merge(state, {isFetching: false, didFail: true, error: action.payload});
		case GET_LOCATION_SUCCESS:
        case WATCH_LOCATION_SUCCESS:
        case BACKGROUND_LOCATION_UPDATE:
            return merge(state, {isFetching: false, coordinate: {...action.payload.coords}});
		default:
			return state
	}
}

const DEFAULT_SELECTION_STATE = {
    dataType: null,
    selection: null,
    quantity: null,
    date: null
}

const selectionReducer = (state = DEFAULT_SELECTION_STATE, action) => {
    switch(action.type) {
        case ADD_DATA_SELECTION:
            return merge(state, {...action.payload})
        default:
            return state;
    }
}


const INITIAL_STATE = {
    data: DEFAULT_USER_DATA,
    selection: DEFAULT_SELECTION_STATE,
    location: DEFAULT_LOCATION_STATE
}

const reducer = combineReducers({
    INITIAL_STATE,
    data: userDataReducer,
    selection: selectionReducer,
    location: locationReducer
})

export default reducer;