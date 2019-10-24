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

import { KeyboardAvoidingView } from 'react-native';

import axios from 'axios';

export default class LoginScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = { username: '', password: '' };
	}

	changeText(key, text) {
		this.setState({ [key]: text })
	}

	async validate() {
		let formData = new FormData()
		formData.append("username", this.state.username)
		formData.append("password", this.state.password)
		let response = await axios({
			method: 'post',
			url: 'http://app.footprints-space-apps.co/login',
			data: formData
		});

		let token = response.headers["jwt-token"]
		axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }

		this.props.navigation.navigate('App');
	}

	async demo() {
		let formData = new FormData()
		formData.append("username", "bob0")
		formData.append("password", "password")
		let response = await axios({
			method: 'post',
			url: 'http://app.footprints-space-apps.co/login',
			data: formData
		});

		let token = response.headers["jwt-token"]
		axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }

		this.props.navigation.navigate('App');
	}

	render() {
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding">
				<View>
					<Text h3 bold style={styles.logInStyle}>Log In!</Text>
				</View>
				<Input onChangeText={username => this.setState({ username })} placeholder="Username" style={styles.inputBox} />
				<Input onChangeText={password => this.setState({ password })} placeholder="Password" password viewPass style={styles.inputBox} />
				<Button round size="small" color="#50C7C7" shadowless onPress={() => this.validate()}> Log in! </Button>
				<Button style={{ marginTop: 7 }} round size="small" color="#50C7C7" shadowless onPress={() => this.demo()}> Demo! </Button>
				<Button
					round
					size="small"
					color="#FFA086"
					shadowless
					onPress={() => this.props.navigation.push('SignUp')}
					style={{ marginTop: 7 }}
				> Sign up! </Button>
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