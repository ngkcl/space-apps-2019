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

export default class SignUpScreen extends React.Component {
	constructor(props){
		super(props)
		this.state = { username: '', password: '', confirmPassword: '', help: false};
	}

	changeText(key, text){
			this.setState({ [key]: text })
	}

	async validate(){
		if(this.state.password == this.state.confirmPassword){ // to add password strength in future
			let res = await axios({
			  method: 'post',
			  url: 'http://app.footprints-space-apps.co/user/register', //TODO: Global consts
			  data: this.state
			});

			// TODO: Make proper alert
			alert('Successful registration! Please login.');
			this.props.navigation.navigate('Login');
		}
		else{
			this.changeText("help", true)
		}


	}

	render(){
		return(
			<KeyboardAvoidingView style={styles.container} behavior="padding">
				<View>
				<Text h3 bold style={styles.logInStyle}>Sign up!</Text>
				</View>
				<Input onChangeText={(t) => this.changeText("username", t)} placeholder="Username" style={styles.inputBox} />
				<Input onChangeText={(t) => this.changeText("password", t)} placeholder="Password" password viewPass style={styles.inputBox}/>
				<View style={(!this.state.help) ? styles.passwordNotMatch : ""}>
				<Text muted color="red" style={(!this.state.help) ? styles.passwordNotMatch : styles.passwordMatch}> Password does not match </Text> 
				</View>
				<Input onChangeText={(t) => this.changeText("confirmPassword", t)} placeholder="Confirm Password" password viewPass style={styles.inputBox}/>
				<Button round size="small" color="#FFA086" shadowless onPress={() => this.validate()}> Sign up! </Button>
				<Button 
					round 
					size="small" 
					color="#50C7C7" 
					shadowless 
					onPress={() => this.props.navigation.navigate('Login')}
					style={{
						marginTop: 7
					}}
				> Log in! </Button>
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
	},
	passwordNotMatch: {
		display: "none"
	},
	passwordMatch: {
		fontSize: 14
	}
});