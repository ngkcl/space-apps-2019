import React from 'react';

import {
    View,
    StyleSheet,

} from 'react-native';


import MapView, {
	PROVIDER_GOOGLE
} from 'react-native-maps';

import { connect } from 'react-redux';

import Constants from 'expo-constants';

import * as Animatable from 'react-native-animatable';

import {
    getLocationAsync,
    watchLocationAsync,
    enableBackgroundLocationAsync
} from '../redux/actions';

import Toast from '../components/Toast';

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
            location: this.props.location || DEFAULT_REGION,
            place: "KFC",
            toastVisible: false
        }
    }

    componentDidMount() {
        this.props.watchLocationAsync();
        this.props.enableBackgroundLocationAsync();

        let interval = setInterval(() => {
            this.setState({
                toastVisible: !this.state.toastVisible
            })
        }, 5000)
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
            <Toast 
                visible={this.state.toastVisible}
                place={"KFC"}
                type={"food"}
            />
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
        alignItems: 'center',
        width: "100%"
    }, 
    map: {
        flex: 1,
        width: '100%',
        height: '100%',
        zIndex: -10
    },
    toastButton: {
        backgroundColor: "red"
    },
    toastStyle: {
        backgroundColor: "white",
        height: 70
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
    },
    enableBackgroundLocationAsync: () => {
        dispatch(enableBackgroundLocationAsync())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)