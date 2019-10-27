import React from 'react';

import {
    Platform,
    StyleSheet,
    Image,
    View,
    Dimensions,
    NativeModules,
    Animated,
    TouchableOpacity
} from 'react-native'

import Carousel, { Pagination } from 'react-native-snap-carousel';

import {
    Text,
    Block
} from "galio-framework"

import profile from "../assets/profile.jpg"
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

export default class UserScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        }
    }

    _renderItem({ item, index }) {
        return (
            <Block card style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                <Text style={{}}>{index}</Text>
            </Block>
        )
    }

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

            </View>
        )
    }
}

const styles = StyleSheet.create({})