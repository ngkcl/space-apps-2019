import React from 'react';

import {
<<<<<<< HEAD
    Platform,
    StyleSheet,
    Image,
    View,
    Dimensions,
    NativeModules,
    Animated,
    TouchableOpacity
=======
    
    StyleSheet,
    Image,
    View,
    Dimensions
>>>>>>> 3e7428e6bdf276b7e627455278bdba2db7782d38
} from 'react-native'

import Carousel, { Pagination } from 'react-native-snap-carousel';

import {
    Text,
    Block
} from "galio-framework"

import profile from "../assets/profile.jpg"
<<<<<<< HEAD
import { white } from 'ansi-colors'

import { List, ListItem } from "native-base"

import { AntDesign } from '@expo/vector-icons';


const settings = [
    {
        title: "Account settings",
        sub: [
            { title: "My information" },
            { title: "History" },
            { title: "Notifications" },
            { title: "Privacy settings", more: true }
        ]
    },
    {
        title: "Integrations",
        sub: [
            { title: "Uber", more: true },
            { title: "Starbucks", more: true },
            { title: "Santender", more: true }
        ]
    }
]
=======
>>>>>>> 3e7428e6bdf276b7e627455278bdba2db7782d38

export default class UserScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
<<<<<<< HEAD
            activeCard: 0,
            statusBar: 20,
            addPading: new Animated.Value(15),
        }

        if (Platform.OS == "ios") {

            NativeModules.StatusBarManager.getHeight((statusBarHeight) => {
                this.setState({ statusBar: statusBarHeight })
            })

        } else {
            this.state.statusBar = NativeModules.StatusBarManager.HEIGHT;
=======
            activeCard: 0
>>>>>>> 3e7428e6bdf276b7e627455278bdba2db7782d38
        }
    }

    _renderItem({ item, index }) {
        return (
            <Block card style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
<<<<<<< HEAD
                <Text style={{}}>{index}</Text>
=======
                <Text style={{}}>{ index }</Text>
>>>>>>> 3e7428e6bdf276b7e627455278bdba2db7782d38
            </Block>
        )
    }

<<<<<<< HEAD
    render() {
        return (
            <View style={{ flex: 1, flexDirection: "column" }}>
                
                <Animated.ScrollView 
                    contentContainerStyle={{ 
                        // paddingTop: this.state.statusBar + 100,
                        paddingHorizontal: 10
                    }}
                    // onScroll={
                    //     Animated.event(
                    //         [{ nativeEvent: { contentOffset: { y: this.state.addPading } } }]
                    //         // { useNativeDriver: true }
                    //     )
                    // }

                    style={{
                    }}
                 
                    
                    // scrollEventThrottle={1} 
                    // overScrollMode={'never'} 
                    >
                <Animated.View style={{
                    // position: "absolute",
                    backgroundColor: "white",
                    zIndex: 3, 
                    // transform: [{'translate': [0,0, 1]}],
                    paddingTop: this.state.addPading.interpolate({
                        inputRange: [0, 100],
                        outputRange: [this.state.statusBar + 25, this.state.statusBar + 5],
                        extrapolate: 'clamp'
                    }), 
                    paddingBottom: this.state.addPading.interpolate({
                        inputRange: [0, 100],
                        outputRange: [25, 5],
                        extrapolate: 'clamp'
                    }), paddingHorizontal: 25, flexDirection: "row", justifyContent: "space-evenly",

                }}>
                    
                    <Image source={profile} style={{ height: 100, width: 100, borderRadius: 5, marginRight: 25 }}></Image>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", color: "white" }}>
                        <Text h1 size={23} color="black">Mr Robot</Text>
                        <Text h2 size={18} color="black">London</Text>
                    </View>
                </Animated.View>
                    { settings.map(section => <View style={{ paddingHorizontal: 25 }}>
                            <Text muted p size={16}>{section.title}</Text>
                            { section.sub.map(element => 
                            <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8 }}>
                                <Text h4 bold>{ element.title }</Text>
                                { element.more ? <AntDesign name={"right"} size={25} paddingBottom={10}></AntDesign> : <View></View> }
                            </TouchableOpacity>
                            )}
                        </View>
                    )}

                    <View style={{ paddingHorizontal: 25, paddingTop: 25 }}>
                        <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8 }}>
                            <Text h4 bold color="red">Log out</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8 }}>
                            <Text h4 bold color="red">Delete account</Text>
                        </TouchableOpacity>
                    </View>

        
                </Animated.ScrollView>
             {/*<View style={{ flexDirection:"row", margin: 10, padding: 0, backgroundColor: "white", borderColor: "#ff147c", borderWidth: 2, borderRadius: 5 }}>
                    <View style={{ height: 5, margin: 0, padding: 0, flex: 9.5, backgroundColor: "#ff147c" }}></View>
                    <View style={{ flex: 0.5 }}></View>
                </View> */}

=======
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
>>>>>>> 3e7428e6bdf276b7e627455278bdba2db7782d38
            </View>
        )
    }
}

const styles = StyleSheet.create({})