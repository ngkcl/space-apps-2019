import {
    ADD_DATA_POINT
} from './actions';

import { combineReducers } from 'redux';

const DEFAULT_USER_DATA = {}

const userDataReducer = (state = DEFAULT_USER_DATA, action) => {
    switch(action.type) {
        case ADD_DATA_POINT:
            return Object.assign({}, state.data, {...action.payload});
        default:
            return state;
    }
}

const INITIAL_STATE = {
    data: DEFAULT_USER_DATA
}

const reducer = combineReducers({
    INITIAL_STATE,
    data: userDataReducer
})

export default reducer;