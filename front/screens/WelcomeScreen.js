import React from 'react';
import { StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
    {
        key: 'somethun',
        title: 'Title 1',
        text: 'Description.\nSay something cool',
        image: require('./assets/1.jpg'),
        backgroundColor: '#59b2ab',
    },
    {
        key: 'somethun-dos',
        title: 'Title 2',
        text: 'Other cool stuff',
        image: require('./assets/2.jpg'),
        backgroundColor: '#febe29',
    },
    {
        key: 'somethun1',
        title: 'Sometimes you need to put a littel effort',
        text: '',
        image: require('../assets/bikingishard.json'),
        backgroundColor: '#22bcb5',
    }
];

export default class App extends React.Component {
    constructor() {
        this.state = {
            showRealApp: false
        }
    }

    _renderItem = (item) => {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{item.title}</Text>
                <Image source={item.image} />
                <Text style={style.text}>{item.text}</Text>
            </View>
        );
    }

    _onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        this.setState({ showRealApp: true });
    }

    render() {
        if (this.state.showRealApp) {
            return <App />;
        } else {
            return <AppIntroSlider renderItem={this._renderItem} slides={slides} onDone={this._onDone} />;
        }
    }
}