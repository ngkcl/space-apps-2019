import React from 'react';

import {
    View,
    StyleSheet,
} from 'react-native';


import MapView, {
    Marker,
	PROVIDER_GOOGLE
} from 'react-native-maps';

import { connect } from 'react-redux';

import Constants from 'expo-constants';

import * as Animatable from 'react-native-animatable';

import {
  getNearby,
  getNearest  
} from '../functions/geoFenceLocal';

import timeout from '../functions/timeout';

import manMarker from '../assets/man.png'

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
            place: {},
            toastVisible: false,
            shouldRenderToast: false
        }
    }

    componentDidMount() {
        this.props.watchLocationAsync();
        this.props.enableBackgroundLocationAsync();
    }

    componentDidUpdate(prevProps, prevState) {
        let { location } = this.props;
        let place = getNearest(location.coordinate.latitude, location.coordinate.longitude, 0.010);
        if (place) {
            this.pushToast(place.name, "food");
        }
    }

    pushToast = async (name = "KFC", type = "food") => {
        await timeout(2000);
        this.place = {
            name,
            type
        }
        this.setState({
            toastVisible: true,
            shouldRenderToast: true
        }, async () => {
            await timeout(4000);
            this.setState({
                toastVisible: false
            })
        })
        
    }

    _renderToast = (placeName, type) => {
        if (this.state.shouldRenderToast) {
            return(<Toast
                visible={this.state.toastVisible}
                {...this.place}
            />)
        } else return null;
    }

    render() {
        return(
        <View
            style={styles.container}
        >
            {this._renderToast()}
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={{
                    ...DEFAULT_REGION,
                    ...this.props.location.coordinate,
                    longitudeDelta: 0.005,
                    latitudeDelta: 0.005
                }}
            >
                <Marker 
                    image={manMarker}
                    title="You are here!"
                    coordinate={{
                        ...this.props.location.coordinate
                    }}
                />
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