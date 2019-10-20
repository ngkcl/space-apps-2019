import React from 'react';

import {
	StyleSheet,
	View
} from 'react-native';

import {
	Input,
	Block,
	Button,
	Text
} from 'galio-framework';

import {KeyboardAvoidingView} from 'react-native';

import axios from 'axios';

export default class LoginScreen extends React.Component {
	constructor(props){
		super(props)
		this.state = { username: '', password: '' };
	}

	changeText(key, text){
			this.setState({ [key]: text })
	}

	validate(){
		let formData = new FormData()
		formData.append("username", this.state.username)
		formData.append("password", this.state.password)
		axios({
		  method: 'post',
		  url: 'http://10.70.43.220:5000/login',
		  data: formData
		});
	}

	render(){
		return(
			<KeyboardAvoidingView style={styles.container} behavior="padding">
				<View>
				<Text h3 bold style={styles.logInStyle}>Log In!</Text>
				</View>
				<Input onChangeText={(t) => this.changeText("username", t)} placeholder="Username" style={styles.inputBox} />
				<Input onChangeText={(t) => this.changeText("password", t)} placeholder="Password" password viewPass style={styles.inputBox}/>
				<Button round size="small" color="#50C7C7" shadowless onPress={() => this.validate()}> Log in! </Button>
			</KeyboardAvoidingView>
		)

	}
}
const styles = StyleSheet.create({
	inputBox: {
		width: "70%"

	},
	container: {
    	flex: 1,
    	justifyContent: 'center',
    	alignItems: 'center'
	},
	logInStyle: {
		paddingBottom: 10
	}
});