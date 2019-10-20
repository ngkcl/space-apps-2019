import React from 'react';
import {
    LineChart
} from "react-native-chart-kit";

import Constants from "expo-constants"

import { Dimensions, PixelRatio } from 'react-native'

import LottieView from "lottie-react-native";
import { Card, Block } from 'galio-framework';

import { StyleSheet, Text, View, Animated, ScrollView } from 'react-native';
import { theme, withGalio, GalioProvider } from 'galio-framework'



const chartConfig = {
    backgroundGradientFrom: '#AAA',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#AAA',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(44, 44, 44, ${opacity})`,
    // strokeWidth: 2, // optional, default 3
    // barPercentage:0.5
}

class UserScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            screenWidth: Dimensions.get("window").width,
            labels: [0],
            datasets: [{ data: [0] }],
            scrollY: new Animated.Value(0)
        }
    }

    async componentDidMount() {

        this.animation.play();

        let data = await fetch("http://10.70.43.220:5000/data/temperature/5/2200")
        let result = await data.json()

        this.setState({
            labels: result.labels,
            datasets: result.datasets.map(dataset => ({ ...dataset, color: (o) => dataset.color }))
        })
    }

    render() {
        return (
            <View backgroundColor="#ff147c">
                <Animated.View style={{
                    zIndex: 1, transform: [{
                        translateY: this.state.scrollY.interpolate({
                            inputRange: [0, 400],
                            outputRange: [0, -100],
                            extrapolate: 'clamp'
                        })
                    }], position: "absolute",
                    left: 0, right: 0, top: 0
                }} paddingTop={Constants.statusBarHeight}>
                    <Block center>
                        <LottieView
                            ref={animation => {
                                this.animation = animation;
                            }}
                            style={{
                                width: this.state.screenWidth / 2,
                                
                                backgroundColor: 'rgba(0,0,0,0)',
                            }}
                            source={require('../assets/person.json')}
                        // source={require('../assets/1380-bikingishard.json')}
                        />
                    </Block>

                </Animated.View>
                <Animated.ScrollView
                    contentContainerStyle={{ paddingTop: this.state.screenWidth / 2 }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                        { useNativeDriver: true }
                    )} scrollEventThrottle={16} overScrollMode={'never'} style={{ zIndex: 10 }}>
                    <Block backgroundColor="#FFF" height={1920} card center style={{ borderColor: "rgba(0,0,0,0)"  }} >
                        <LineChart
                            data={{
                                labels: this.state.labels,
                                datasets: this.state.datasets
                            }}
                            width={this.state.screenWidth - 20}
                            height={256}
                            // verticalLabelRotation={30}
                            chartConfig={chartConfig}
                            // withDots={false}
                            style={{
                                borderRadius: 16,
                                marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(1)
                            }}
                        />
                    </Block>
                </Animated.ScrollView>
            </View>


        )
    }
}

export default withGalio(UserScreen);