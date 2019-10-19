import React from 'react';

import {
    View,
    StyleSheet,

} from 'react-native';


import MapView, {
	PROVIDER_GOOGLE
} from 'react-native-maps';


import { connect } from 'react-redux';

class HomeScreen extends React.Component {
    constructor() {
        super()

        state = {

        }
    }

    render() {
        return(
        <View
            style={styles.container}
        >
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
            >


            </MapView>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }, 
    map: {
        flex: 1,
        width: '100%',
        height: '100%'
    }
})


const mapStateToProps = state => ({
	data: state.data
});

const mapDispatchToProps = dispatch => ({
	getLocationAsync: () => {
		dispatch(getLocationAsync())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)