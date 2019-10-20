import React from 'react';
import {
    LineChart
} from "react-native-chart-kit";

import { StyleSheet, View, Animated, ScrollView } from 'react-native';

import Constants from "expo-constants"

import { Dimensions, PixelRatio } from 'react-native'

import LottieView from "lottie-react-native";

import { Card, Block, Text } from 'galio-framework';
import { theme, withGalio, GalioProvider } from 'galio-framework'


import axios from "axios"


const chartConfig = {
    backgroundGradientFrom: '#022173',
    backgroundGradientFromOpacity: 0, 
    backgroundGradientTo: '#1b3fa0',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(44, 44, 44, ${opacity})`,
    // strokeWidth: 2, // optional, default 3
    // barPercentage:0.5
}

class UserScreen extends React.Component {
    constructor(props) {
        super(props);

        this.subscription = null
        this.state = {
            screenWidth: Dimensions.get("window").width,
            labels: [0],
            datasets: [{ data: [0] }],
            scrollY: new Animated.Value(0),
            time: 0,
            avg_emissions: 0
        }
    }

    componentWillUnmount() {
        this.subscription.remove()
    }

    async temperatre() {

        let { data } = await axios.get("http://10.70.43.220:5000/data/temperature/2200")

        this.setState({
            labels: data.labels,
            datasets: data.datasets.map(dataset => ({ ...dataset, color: (o) => dataset.color }))
        })

    }

    async time() {
        let { data } = await axios.get("http://10.70.43.220:5000/data/time/2")
        this.setState({
            time: data
        })
    }

    async avg_emissions() {
        let { data } = await axios.get("http://10.70.43.220:5000/user/avg_emissions")
        this.setState({
            avg_emissions: data
        })
    }

    async componentDidMount() {
        this.subscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
                this.animation.play();
            }
          );

        await this.temperatre()
        await this.time()
        await this.avg_emissions()
          
        this.animation.play();

    }

    render() {
        return (
            <View backgroundColor="#ff147c">
                <Animated.View 
                    style={{
                        zIndex: 1, 
                        transform: [{
                            translateY: this.state.scrollY.interpolate({
                                inputRange: [0, 400],
                                outputRange: [0, -100],
                                extrapolate: 'clamp'
                            })
                        }], 
                        position: "absolute",
                        left: 0, 
                        right: 0, 
                        top: 0
                    }} 
                    paddingTop={Constants.statusBarHeight}
                >
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
                        />
                    </Block>

                </Animated.View>
                <Animated.ScrollView
                    contentContainerStyle={{ 
                        paddingTop: this.state.screenWidth / 2 
                    }}
                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                            { useNativeDriver: true }
                        )
                    } 
                    scrollEventThrottle={16} 
                    overScrollMode={'never'} 
                    style={{ 
                        zIndex: 10
                    }}
                >
                    <Block 
                        width={this.state.screenWidth - 20} 
                        backgroundColor="#FFF" 
                        height={1920} 
                        card 
                        center 
                        style={{
                            paddingLeft: 17,
                            paddingRight: 17,
                            borderColor: "rgba(0,0,0,0)" 
                        }}
                    >
                        <Block style={styles.textBlock1}>
                            <Text h4 bold style={styles.dataHeading}>Here's some cool data on your eco impact</Text>

                            <Text p style={{marginBottom: 10}}>Based on your living habits, for the past two weeks your personal average emission of CO2 (in metric tons per year) is</Text>
                            
                            <Text h3 bold>{this.state.avg_emissions.toFixed(1)}</Text>
                            <Text p style={{marginTop: 10}}>That's not too bad! Last month the same metric was at <Text bold>{Math.round(this.state.avg_emissions + 3)}</Text>. That's an improvement of <Text bold>{(100 - ((this.state.avg_emissions/(this.state.avg_emissions+3))*100)).toFixed(2)}%</Text> !</Text>
                        </Block>

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
                                marginTop: 24,
                                borderRadius: 16,
                                marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(1)
                            }}
                        />

                        <Block style={styles.textBlock2}>
                            <Text p>What about that graph above? The gray line shows the predicted average global temperature if everyone suddenly adopted your lifestyle. The two extremes are shown in <Text color="red">red</Text> (worst case scenario) and <Text color="green">green</Text>(best case scenario){"\n"} </Text>

                            <Text p style={{marginBottom: 10}}>We estimate that at this rate, the year in which the 2 degree point of no return is reached in the year:</Text>
                            <Text h3 bold>{ this.state.time }</Text>
                            <Text p style={{marginTop: 20}}>That's all from me today! Was that positive? negative? I can't decide, I'm just some complicated if-statements in a machine! What I am here for is to give you a realistic view on your impact on the environment and help you out with some tips! <Text italic>See you tomorrow for your next report!</Text></Text>
                        </Block>
                        {/* <Text>Out average emission for the past week in metric to per year { this.state.avg_emissions }  </Text> */}
                    </Block>
                </Animated.ScrollView>
            </View>


        )
    }
}

const styles = StyleSheet.create({
    dataHeading: {
        padding: 14,
        marginBottom: 20
    },
    textBlock1: {
        alignItems: 'center'
    },
    textBlock2: {
        alignItems: 'center'
    }
})

export default withGalio(UserScreen);