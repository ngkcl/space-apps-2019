import React from 'react';

import {
    StyleSheet
} from 'react-native';

import MapView, {
	PROVIDER_GOOGLE
} from 'react-native-maps';


class Map extends React.Component {
    componentWillReceiveProps(newProps) {
        alert("map new props " + JSON.stringify(newProps));
    }
    render() {
        return(
        <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={this.props.location}
        >

        </MapView>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        width: '100%',
        height: '100%'
    }
}) 

export default Map;