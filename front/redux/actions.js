import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

import axios from 'axios';

// Stupid, remove later:
import store from '../redux/store';
// ---------------------

const API_URL = 'http://app.footprints-space-apps.co';

// Async functions constants:
export const GET_LOCATION_START = 'GET_LOCATION_START';
export const GET_LOCATION_FAIL = 'GET_LOCATION_FAIL';
export const GET_LOCATION_SUCCESS = 'GET_LOCATION_SUCCESS';

export const WATCH_LOCATION_START = 'WATCH_LOCATION_START';
export const WATCH_LOCATION_FAIL = 'WATCH_LOCATION_FAIL';
export const WATCH_LOCATION_SUCCESS = 'WATCH_LOCATION_SUCCESS';

export const ENABLE_BACKGROUND_LOCATION_START = 'ENABLE_BACKGROUND_LOCATION_START';
export const ENABLE_BACKGROUND_LOCATION_FAIL = 'ENABLE_BACKGROUND_LOCATION_FAIL';
export const ENABLE_BACKGROUND_LOCATION_SUCCESS = 'ENABLE_BACKGROUND_LOCATION_SUCCESS';

export const UPLOAD_DATA_POINT_START = 'UPLOAD_DATA_POINT_START';
export const UPLOAD_DATA_POINT_FAIL = 'UPLOAD_DATA_POINT_FAIL';
export const UPLOAD_DATA_POINT_SUCCESS = 'UPLOAD_DATA_POINT_SUCCESS';
// ----------------------------

// Other constants:
export const BACKGROUND_LOCATION_UPDATE = "BACKGROUND_LOCATION_UPDATE";
export const ADD_DATA_POINT = 'ADD_DATA_POINT';
export const ADD_DATA_SELECTION = "ADD_DATA_SELECTION";
// ----------------------------

export const addDataPoint = data => ({
    type: ADD_DATA_POINT,
    payload: data
});

export const addDataSelection = data => ({
	type: ADD_DATA_SELECTION,
	payload: data
})

export const uploadDataPointAsync = () => async dispatch => {
	dispatch({type: UPLOAD_DATA_POINT_START});

	try {
		let selection = store.getState().selection;
		let res = await axios.post(API_URL + '/user/datapoint', selection);
	} catch (err) {
		dispatch({
			type: UPLOAD_DATA_POINT_FAIL,
			payload: err
		})
	}
}

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

// DEV - Alerts status on BACKGROUND_LOCATION task
const alertTaskStatus = async () => alert(await TaskManager.isTaskRegisteredAsync("BACKGROUND_LOCATION"))

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
		let location = await Location.watchPositionAsync({
            distanceInterval: 20,
        }, location => {
			// alertTaskStatus();
            dispatch({
                type: WATCH_LOCATION_SUCCESS,
                payload: location
            });
        });
	} catch(err) {
		dispatch({
			type: WATCH_LOCATION_FAIL,
			payload: err
		});
	}
}

export const updateBackgroundLocation = location => ({
	type: BACKGROUND_LOCATION_UPDATE,
	payload: location
});


TaskManager.defineTask("BACKGROUND_LOCATION", ({ data: { locations }, error }) => {
    if (error) {
        return;
    }
    for (loc in locations) {
		updateBackgroundLocation(loc);
	}
});

export const enableBackgroundLocationAsync = () => async dispatch => {
    dispatch({ type: ENABLE_BACKGROUND_LOCATION_START });
	let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status != 'granted') {
		dispatch({
			type: ENABLE_BACKGROUND_LOCATION_FAIL,
			payload: "Permission not granted"
		});
		return;
    }

	try {
		let isRegged = await TaskManager.isTaskRegisteredAsync("BACKGROUND_LOCATION");

		if (!isRegged) {
			dispatch({
				type:ENABLE_BACKGROUND_LOCATION_FAIL,
				payload: "Task manager not registered"
			})
		}

		let hasStartedLocationUpdates = await Location.hasStartedLocationUpdatesAsync("BACKGROUND_LOCATION");

		if (!Location.hasStartedLocationUpdates) {
			await Location.startLocationUpdatesAsync("BACKGROUND_LOCATION", {
				distanceInterval: 20,
				pausesUpdatesAutomatically: true
			});
		}
	} catch(err) {
		dispatch({
			type: WATCH_LOCATION_FAIL,
			payload: err
		})
	}
}