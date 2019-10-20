import React from 'react';
import {
    Animated, 
    TouchableHighlight, 
    View
} from "react-native";

import * as Animatable from 'react-native-animatable';

import Icon from '@expo/vector-icons/FontAwesome';

import { withNavigation } from 'react-navigation';

const SIZE = 80;

class AddButton extends React.Component {
    mode = new Animated.Value(0);   
    
    render() {
        let curr = this.props.navigation.state.routes[this.props.navigation.state.index];

        return (
            <Animatable.View style={{
                position: 'absolute',
                alignItems: 'center'
            }}>  
                <TouchableHighlight
                    onPress={() => {
                        if (curr.key != 'Add') {
                            this.props.navigation.navigate("Add");
                        } else {

                        }
                    }}
                    underlayColor="#3498db"
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: SIZE,
                        height: SIZE,
                        borderRadius: SIZE / 2,
                        backgroundColor: '#48A2F8'
                    }}
                >
                    <View style={{}}>
                        <Icon name="plus" size={24} color="#F8F8F8"/>
                    </View>
                </TouchableHighlight>
            </Animatable.View>
        );
    }
}

export default withNavigation(AddButton);