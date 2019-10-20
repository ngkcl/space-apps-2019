import React from 'react';
import { useState, useEffect } from 'react';
import {
    Animated,
    TouchableHighlight,
    View
} from "react-native";

import * as Animatable from 'react-native-animatable';

import Icon from '@expo/vector-icons/FontAwesome';

import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { addDataSelection, uploadDataPointAsync } from '../redux/actions';

const SIZE = 80;

const AddButton = (props) => {

    const [scaleAnim] = useState(new Animated.Value(1))  // Initial value for opacity: 0



    let curr = props.navigation.state.routes[props.navigation.state.index];

    // React.useEffect(() => {
    if (curr.key == "Add") {

        Animated.timing(
            scaleAnim,
            {
                toValue: 1.2,
                duration: 250,
            }
        ).start();
    } else {

        Animated.timing(
            scaleAnim,
            {
                toValue: 1,
                duration: 250,
            }
        ).start();

    }

    // }, [scaleAnim])
    // alert(JSON.stringify(curr))


    return (
        <Animatable.View style={{
            position: 'absolute',
            alignItems: 'center',
            transform: [{ scale: scaleAnim }, {
                translateY: 
                scaleAnim.interpolate({
                    inputRange: [1, 1.3],
                    outputRange: [0, -24]
                })
            }]
        }}>
            <TouchableHighlight
                onPress={() => {
                    if (curr.key != 'Add') {
                        props.navigation.navigate("Add");
                    } else {
                        props.uploadDataPointAsync()
                    }
                }}
                underlayColor="#3498db"
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: SIZE,
                    height: SIZE,
                    borderRadius: SIZE / 2,
                    backgroundColor: '#48A2F8',
                }}
            >
                <Animatable.View style={{ opacity: scaleAnim }}>
                    <Icon name="plus" size={24} color="#F8F8F8" />
                </Animatable.View>
            </TouchableHighlight>
        </Animatable.View>
    );
}


const mapDispatchToProps = dispatch => ({
    addDataSelection: data => {
        dispatch(addDataSelection(data))
    },
    uploadDataPointAsync: () => {
        dispatch(uploadDataPointAsync())
    }
})


export default connect(() => ({}), mapDispatchToProps)(withNavigation(AddButton));