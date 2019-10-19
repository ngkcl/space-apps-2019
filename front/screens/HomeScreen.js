import React from 'react';

import {
    View,
    StyleSheet,

} from 'react-native';


import MapView, {
	PROVIDER_GOOGLE
} from 'react-native-maps';

import { connect } from 'react-redux';

import Map from '../components/Map';

import Qs from 'qs';

import {
    getLocationAsync,
    watchLocationAsync
} from '../redux/actions';

const DEFAULT_REGION = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            location: this.props.location || DEFAULT_REGION
        }
    }

    componentDidMount() {
        this.props.watchLocationAsync();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            location: nextProps.location
        });
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
                    ...this.state.location.coordinate,
                    longitudeDelta: 0.001,
                    latitudeDelta: 0.001
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
    data: state.data,
    location: state.location
});

const mapDispatchToProps = dispatch => ({
    getLocationAsync: () => {
        dispatch(getLocationAsync())
    },
	watchLocationAsync: () => {
		dispatch(watchLocationAsync())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)