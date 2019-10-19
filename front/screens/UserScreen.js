import React from 'react';
import {
    LineChart
} from "react-native-chart-kit";

import Constants from "expo-constants"

import { Dimensions, PixelRatio } from 'react-native'

import {
    StyleSheet,
    View,
    Text
} from 'react-native';


const chartConfig = {
    backgroundGradientFrom: '#AAA',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#AAA',
    backgroundGradientToOpacity: 1,
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
            datasets: [{ data: [0] }]
        }
    }

    async componentDidMount() {
        
            let data = await fetch("http://10.70.43.220:5000/data/5/2100")
            let result = await data.json()

            this.setState({ 
                labels: result.labels,
                datasets: result.datasets.map(dataset => ({ data: dataset })) 
            })
    }

    render() {
        return(
            <View>
                <View style={{ marginBottom: PixelRatio.getPixelSizeForLayoutSize(5) }} backgroundColor="#00ff55" height={Constants.statusBarHeight}>
                    
                </View>
                <LineChart
                    data={{
                        labels: this.state.labels,
                        datasets: this.state.datasets
                    }}
                    width={this.state.screenWidth}
                    height={256}
                    verticalLabelRotation={30}
                    chartConfig={chartConfig}
                    withDots={false}
                    bezier
                    style={{
                        borderRadius: 16,
                        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(1)
                    }}
                />
            </View>
        )
    }
} 

export default UserScreen;