import React, { Component } from "react";

import { StyleSheet, View, Text, Image } from "react-native";

import * as Animatable from 'react-native-animatable';

import foodPic from '../assets/groceries.png';

import Constants from 'expo-constants';

import { withNavigation } from 'react-navigation';

class Toast extends Component {
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

    _getPlace = () => this.props.name

    _getQuestion = () => {
        switch(this.props.type) {
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
                You are detected to be in {this._getPlace()}. {this._getQuestion()}
            </Text>
            <Text style={styles.buttonText} onPress={() => this.props.navigation.navigate('Add')}>Add</Text>
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
    padding: 25,
    marginTop: Constants.statusBarHeight + 15,
    borderRadius: 2
  },
  text1: {
    width: 170,
    height: 50,
    color: "rgba(255,255,255,1)",
    marginLeft: 57,
    marginRight: 10,
    fontSize: 14,
    lineHeight: 15,
    flexWrap: 'wrap'
  },
  buttonText: {
    width: 25,
    height: 14,
    color: "#4CAF50",
    fontSize: 14
  },
  image: {
    left: 11,
    width: 50,
    height: 80,
    position: "absolute"
  }
});


export default withNavigation(Toast);