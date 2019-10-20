import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Root } from "native-base";

// Nav:
import {
  createAppContainer,
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
  MaterialCommunityIcons,
} from '@expo/vector-icons';

// Screens:
import HomeScreen from './screens/HomeScreen';
import UserScreen from './screens/UserScreen';
import AddScreen from './screens/AddScreen';
import AddDataSelectionScreen from './screens/AddDataSelectionScreen';

import AddButton from './components/AddButton';

const TabNavigator = createBottomTabNavigator({
  Map: {
    screen: HomeScreen
  },
  Add: {
    screen: AddScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: (<AddButton />)
    })
  },
  User: {
    screen: UserScreen
  },
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      // tintColor = ''
      const { routeName } = navigation.state;

      let IconComponent = MaterialCommunityIcons;
      let iconName = '';
      if (routeName == 'Map') {
        iconName = `map${focused ? '' : '-outline'}`;
      } else if (routeName == 'User') {
        iconName = `account`;
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
    activeTintColor: 'tomato',
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
})

const AppContainer = createAppContainer(HomeStack);

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
