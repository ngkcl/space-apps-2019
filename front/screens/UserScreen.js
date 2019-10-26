import React from 'react';

import {
    
    StyleSheet,
    Image,
    View,
    Dimensions
} from 'react-native'

import Carousel, { Pagination } from 'react-native-snap-carousel';

import {
    Text,
    Block
} from "galio-framework"

import profile from "../assets/profile.jpg"

export default class UserScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeCard: 0
        }
    }

    _renderItem({ item, index }) {
        return (
            <Block card style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                <Text style={{}}>{ index }</Text>
            </Block>
        )
    }

    render () { 
        return(
            <View style={{ flex: 1, flexDirection: "column" }}>
                <View style={{ backgroundColor: "#ff147c" , paddingTop: 40, paddingHorizontal: 40, flexDirection: "row", justifyContent: "space-evenly" }}>
                    <Image source={ profile } style={{ height: 50, width: 50, borderRadius: 50 }}></Image>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", color: "white" }}>
                        <Text h1 size={23} color="white">Mr Robot</Text>
                        <Text h2 size={18} color="white">London</Text>
                    </View>
                </View>
                <Pagination 
                    dotColor={'rgba(255, 255, 255, 0.92)'}
                    inactiveDotColor={"black"}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    dotsLength={3} 
                    activeDotIndex={this.state.activeCard}
                    carouselRef={this._carousel} 
                    tappableDots={!!this._carousel} ></Pagination>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={["red", "blue", "green"]}
                    renderItem={this._renderItem}
                    sliderWidth={ Dimensions.get("window").width }
                    itemWidth={ Dimensions.get("window").width - 60 }
                    centerContent={true}
                    contentContainerCustomStyle={{ paddingBottom: 10 }}
                    style={{ flex:1, overflow: "auto", alignSelf: "stretch" }}
                    onSnapToItem={(index) => this.setState({ activeCard: index }) }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({})