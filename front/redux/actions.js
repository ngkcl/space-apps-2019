import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

export const ADD_DATA_POINT = 'ADD_DATA_POINT';

// Async functions:
export const GET_LOCATION_START = 'GET_LOCATION_START';
export const GET_LOCATION_FAIL = 'GET_LOCATION_FAIL';
export const GET_LOCATION_SUCCESS = 'GET_LOCATION_SUCCESS';

export const WATCH_LOCATION_START = 'WATCH_LOCATION_START';
export const WATCH_LOCATION_FAIL = 'WATCH_LOCATION_FAIL';
export const WATCH_LOCATION_SUCCESS = 'WATCH_LOCATION_SUCCESS';

export const ENABLE_BACKGROUND_LOCATION_START = 'ENABLE_BACKGROUND_LOCATION_START';
export const ENABLE_BACKGROUND_LOCATION_FAIL = 'ENABLE_BACKGROUND_LOCATION_FAIL';
export const ENABLE_BACKGROUND_LOCATION_SUCCESS = 'ENABLE_BACKGROUND_LOCATION_SUCCESS';

export const BACKGROUND_LOCATION_UPDATE = "BACKGROUND_LOCATION_UPDATE";



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
        alert("get location: " + JSON.stringify(location))
	} catch(err) {
		dispatch({
			type: GET_LOCATION_FAIL,
			payload: err
		})
	}
}

const alertTaskStatus = async () => {
	alert(await TaskManager.isTaskRegisteredAsync("BACKGROUND_LOCATION"))
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
    for (i in locations) {
        // alert(i);
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