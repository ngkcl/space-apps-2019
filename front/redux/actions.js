import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

export const ADD_DATA_POINT = 'ADD_DATA_POINT';

// Async functions:
export const GET_LOCATION_START = 'GET_LOCATION_START';
export const GET_LOCATION_FAIL = 'GET_LOCATION_FAIL';
export const GET_LOCATION_SUCCESS = 'GET_LOCATION_SUCCESS';

export const WATCH_LOCATION_START = 'WATCH_LOCATION_START';
export const WATCH_LOCATION_FAIL = 'WATCH_LOCATION_FAIL';
export const WATCH_LOCATION_SUCCESS = 'WATCH_LOCATION_SUCCESS';

export const addDataPoint = data => ({
    type: ADD_DATA_POINT,
    payload: data
})

export const getLocationAsync = () => async dispatch => {
	dispatch({ type: GET_LOCATION_START });
	let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status != 'granted') {
		dispatch({
			type: GET_LOCATION_FAIL,
			payload: "Permission not granted"
		});
		return;
    }

	try {
		let location = await Location.getCurrentPositionAsync();
		dispatch({
			type: GET_LOCATION_SUCCESS,
			payload: location
		})
	} catch(err) {
		dispatch({
			type: GET_LOCATION_FAIL,
			payload: err
		})
	}
}


export const watchLocationAsync = () => async dispatch => {
    dispatch({ type: WATCH_LOCATION_START });
	let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status != 'granted') {
		dispatch({
			type: WATCH_LOCATION_FAIL,
			payload: "Permission not granted"
		});
		return;
    }

	try {
		let location = await Location.watchPositionAsync({}, data => {
            dispatch({
                type: WATCH_LOCATION_SUCCESS,
                payload: location
            })
        });
	} catch(err) {
		dispatch({
			type: WATCH_LOCATION_FAIL,
			payload: err
		})
	}
}

export const backgroundLocationAsync = () => async dispatch => {
    dispatch({ type: BACKGROUND_LOCATION_START });
	let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status != 'granted') {
		dispatch({
			type: WATCH_LOCATION_FAIL,
			payload: "Permission not granted"
		});
		return;
    }

	try {
		let location = await Location.startLocationUpdatesAsync({}, data => {
            dispatch({
                type: WATCH_LOCATION_SUCCESS,
                payload: location
            })
        });
	} catch(err) {
		dispatch({
			type: WATCH_LOCATION_FAIL,
			payload: err
		})
	}
}