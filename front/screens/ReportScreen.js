import React from 'react';
import {
    LineChart,
    ContributionGraph
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
}

const API_ADDR = 'http://app.footprints-space-apps.co';

class ReportScreen extends React.Component {
    constructor(props) {
        super(props);

        this.subscription = null
        this.state = {
            screenWidth: Dimensions.get("window").width,
            labels: [0],
            datasets: [{ data: [0] }],
            scrollY: new Animated.Value(0),
            time: 0,
            avg_emissions: 0,
            calendar: []
        }
    }

    componentWillUnmount() {
        this.subscription.remove()
    }

    async temperatre() {
        let { data } = await axios.get(API_ADDR + "/data/temperature/2200")

        this.setState({
            labels: data.labels,
            datasets: data.datasets.map(dataset => ({ ...dataset, color: (o) => dataset.color }))
        })

    }

    async time() {
        let { data } = await axios.get(API_ADDR + "/data/time/2")
        this.setState({
            time: data
        })
    }

    async avg_emissions() {
        let { data } = await axios.get(API_ADDR + "/user/avg_emissions")
        this.setState({
            avg_emissions: data
        })
    }

    async calendar() {
        let { data } = await axios.get(API_ADDR + "/user/cal/11")
        this.setState({
            calendar: data.map(el => {
                let d = new Date(el.time);
                let ds = "" + d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate()
                return { date: ds, count: parseFloat(el.avg) }
            })
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
        await this.calendar()

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

                            <Text p style={{marginBottom: 10}}>Based on your daily life, for the past week your average emission of CO2 (in MT/year) is</Text>
                            
                            <Text h3 bold>{this.state.avg_emissions.toFixed(1)}</Text>
                            <Text p style={{marginTop: 10}}>Oops! Last month the same metric was at <Text bold>{(this.state.avg_emissions - 1.5).toFixed(1)}</Text>. That's an increase of <Text color="red" bold>{(100 - ((this.state.avg_emissions/(this.state.avg_emissions+3))*100)).toFixed(2)}%</Text> !</Text>
                        </Block>

                        <LineChart
                            data={{
                                labels: this.state.labels,
                                datasets: this.state.datasets
                            }}
                            width={this.state.screenWidth - 20}
                            height={256}
                            chartConfig={chartConfig}
                            style={styles.lineChart}
                        />

                        <Block style={styles.textBlock2}>
                            <Text p>What about that graph above? The gray line shows the predicted average global temperature if everyone suddenly adopted your lifestyle. The two extremes are shown in <Text color="red">red</Text> (worst case scenario) and <Text color="green">green</Text>(best case scenario){"\n"} </Text>

                            <Text p style={{marginBottom: 10}}>We estimate that at this rate, the year in which the 2 degree point of no return is reached in the year:</Text>
                            <Text h3 bold style={{marginBottom: 20}}>{ this.state.time }</Text>
                            
                            <Text p style={{marginTop: 20, marginBottom: 20}}>Last but not least, just below you can see your contribution graph for the past 3 months (darker means more contribution). Remember, you will get more benefits if you maintain a streak!</Text>
                            <Block style={{alignItems: 'center'}}>
                                <ContributionGraph values={this.state.calendar} endDate={new Date('2019-10-20')}
        numDays={104} width={this.state.screenWidth} height={240} chartConfig={chartConfig} ></ContributionGraph>
                            </Block>

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
    },
    lineChart: {
        marginTop: 24,
        borderRadius: 16,
        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(1)
    }
})

export default withGalio(ReportScreen);