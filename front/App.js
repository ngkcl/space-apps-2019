import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Nav:
import {
  createAppContainer,
} from 'react-navigation';

import {
  createStackNavigator
} from 'react-navigation-stack'

// Redux:
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadProperties, getLocationAsync, addFilter } from './redux/actions';

// Screens:
import HomeScreen from './screens/HomeScreen';

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  }
})

const AppContainer = createAppContainer(HomeStack);

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
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
