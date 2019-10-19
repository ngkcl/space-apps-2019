import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
// import { Center } from "native-base";
import * as Animatable from 'react-native-animatable';

import foodPic from '../assets/groceries.png';

import Constants from 'expo-constants';

import { Button } from "native-base";

export default class Toast extends Component {
    constructor(props) {
        super(props);

        this.state = {
			visible: props.visible,
		};
    }

    handleViewRef = ref => this.view = ref;

    bounce = () => this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));

    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible,
            place: nextProps.place,
            type: nextProps.type
        });
    }
    
    getAnimation = () => this.state.visible ? "bounceInDown" : "bounceOutUp"

    _getPlace = () => this.state.place

    _getQuestion = () => {
        switch(this.state.type) {
            case "food":
                return "Did you eat something?"
            case "bar":
                return "Did you drink something?"
            default: 
                return "Did you get something?"
        }
    }

    render() {	
        return (
        <Animatable.View 
            style={[styles.container, this.props.style]} 
            ref={this.handleViewRef}
            animation={this.getAnimation()}
            useNativeDriver
            duration={2000}
        >
            <Text style={styles.text1}>
            You are detected to be in {this._getPlace()}.
            {this._getQuestion()}
            </Text>
            <Text style={styles.buttonText} onPress={this.bounce}>Add</Text>
            <Image
                source={foodPic}
                resizeMode="contain"
                style={styles.image}
            /> 
        </Animatable.View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#323232",
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    opacity: 1,
    justifyContent: "space-between",
    padding: 24,
    marginTop: Constants.statusBarHeight + 15,
    borderRadius: 2
  },
  text1: {
    width: 169,
    height: 40,
    color: "rgba(255,255,255,1)",
    marginLeft: 57,
    fontSize: 12,
    lineHeight: 20
  },
  buttonText: {
    width: 25,
    height: 14,
    color: "#4CAF50",
    marginLeft: 12,
    fontSize: 14
  },
  image: {
    left: 11,
    width: 50,
    height: 80,
    position: "absolute"
  }
});
