import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Root } from "native-base";

// Nav:
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';

import {
  createStackNavigator
} from 'react-navigation-stack';

import {
  createBottomTabNavigator
} from 'react-navigation-tabs';

// Redux:
import { Provider } from 'react-redux';
import store from './redux/store';


import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons  
} from '@expo/vector-icons';

// Screens:
import HomeScreen from './screens/HomeScreen';
import UserScreen from './screens/UserScreen';
import AddScreen from './screens/AddScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

import AddDataSelectionScreen from './screens/AddDataSelectionScreen';

import AddButton from './components/AddButton';
import PlanScreen from './screens/PlanScreen';
import ReportScreen from './screens/ReportScreen';


// NOTE: DEV ----------------------
console.disableYellowBox = true;
// ================================

const TabNavigator = createBottomTabNavigator({
  Map: {
	screen: HomeScreen
  },
  Plan: {
	  screen: PlanScreen
  },
  Add: {
	screen: AddScreen,
	navigationOptions: ({ navigation }) => ({
	  tabBarIcon: (<AddButton />)
	})
  },
  Report: {
	screen: ReportScreen
  },
  Account: {
	screen: UserScreen
  },
}, {
  defaultNavigationOptions: ({ navigation }) => ({
	tabBarIcon: ({ focused, horizontal, tintColor }) => {
	  const { routeName } = navigation.state;

	  let IconComponent = MaterialCommunityIcons;
	  let iconName = '';
	  if (routeName == 'Map') {
		iconName = `map${focused ? '' : '-outline'}`;
	  } else if (routeName == 'Plan') {
		iconName = `checkbox-marked-circle${focused ? '' : '-outline'}`;
	  } else if (routeName == 'Report') {
		iconName = `clipboard-text${focused ? '' : '-outline'}`;
	  } else if (routeName == 'Account') {
		iconName = `account${focused ? '' : '-outline'}`;
	  } 

	  return <IconComponent name={iconName} size={25} color={tintColor} />;
	},
	tabBarLabel: ({ focused, tintColor }) => {
	  const { routeName } = navigation.state;
	  if (routeName === "Add") return <Text />;
	  else
		return (
		  <Text
			style={{
			  // fontFamily: Globals.font_primary,
			  fontSize: 12,
			  alignSelf: "center",
			  color: tintColor,
			  marginBottom: 2
			}}
		  >
			{routeName}
		  </Text>
		);
	}
  }),
  tabBarOptions: {
	activeTintColor: '#ff147c',
	inactiveTintColor: 'gray',
	showLabel: true
  },
  initialRouteName: 'Map'
});

const HomeStack = createStackNavigator({
  Home: {
	screen: TabNavigator,
	navigationOptions: {
	  header: null
	}
  },
  AddData: {
	screen: AddDataSelectionScreen,
	navigationOptions: {
	  header: null
	}
  }
});

const AuthStack = createStackNavigator({
  Login: {
	screen: LoginScreen,
	navigationOptions: {
	  header: null
	}
  },
  SignUp: {
	screen: SignUpScreen,
	navigationOptions: {
	  header: null
	}
  }
})

const AppContainer = createAppContainer(createSwitchNavigator(
	{
		Auth: AuthStack,
		App: HomeStack
	}, {
		initialRouteName: 'App'
	}
));

export default function App() {
  return (
	<Provider store={store}>
	  <Root>
		<AppContainer />
	  </Root>
	</Provider>
  );
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	backgroundColor: '#fff',
	alignItems: 'center',
	justifyContent: 'center',
  },
});
