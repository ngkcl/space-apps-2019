import React from 'react';

import {
    StyleSheet,
    View,
    ScrollView,
    FlatList,
    Image,
    Dimensions
} from 'react-native';

import {
    Card,
    CardItem,
    Left,
    Right,
    Body,
    Thumbnail,
    Content,
    Container,
} from 'native-base'

import {
    Text
} from 'galio-framework'

import Carousel, { Pagination } from 'react-native-snap-carousel';

import LottieView from "lottie-react-native";

// Lottie json files

import bikeLottie from '../assets/bike.json';
import foodLottie from '../assets/food.json';

import Constants from 'expo-constants';

import uuid from 'uuid/v4';

import * as Progress from 'react-native-progress'

// import SwipeCard from '../components/SwipeCard';

SAMPLE_CARD_DATA = [
    {
        id: uuid(),
        type: 'transport',
        action_type: 'car',
        action_date: 'today',
        text: <Text p>Today you used an <Text p bold>Uber 🚗</Text> for <Text bold p>3.31 km</Text>, taking the <Text bold p>bike 🚲</Text> instead tomorrow will improve your carbon emissions by <Text bold p>5%</Text></Text>,
        steps: 1,
        currentStep: 0,
        substitute_timespan: 'week',
        substitute: 'bike',
        substitute_times: 4
    },
    {
        id: uuid(),
        type: 'food',
        action_type: 'eat',
        action_date: 'week',
        text: <Text p>This week you ate <Text bold p>700 g</Text> of <Text bold p>beef 🐮</Text>, eating the same amount of <Text bold p>chicken 🐔</Text> this week would improve your emissions by <Text bold p>10%</Text></Text>,
        steps: 700,
        currentStep: 0,
        substitute_timespan: 'week',
        substitute: 'bike',
        substitute_times: 4
    }
]

export default class PlanScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeCard: 0
        }
    }

    _selectLottie = type => {
        switch(type) {
            case 'transport':
                return bikeLottie;
                break;
            case 'food':
                return foodLottie;
                break;
            default:
                return null;
        }
    } 

    _renderCard = ({item, index, separators}) => (
        <Card
            style={styles.cardContainer}
        >
            <CardItem cardBody style={styles.cardHeader}>
                <LottieView
                    source={this._selectLottie(item.type)}
                    style={styles.cardImage}
                    autoPlay
                    loop
                />   
                {/* <Image source={{uri: 'https://img.memecdn.com/sorry-babe-nasa-needs-me_o_1032877.jpg'}} style={styles.cardImage}/> */}
            </CardItem>
            {/* <CardItem style={styles.cardActionsContainer}> */}
                {/* TODO: Actions */}
            {/* </CardItem> */}
            <CardItem style={styles.cardContent}>
                {item.text}
            </CardItem>
            <CardItem style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text h5 bold style={{color: '#ff147c'}}>{item.currentStep} / {item.steps}</Text>
            </CardItem>
            <CardItem style={{display: 'flex', justifyContent: 'center', paddingTop: 2}}>
                <Progress.Bar progress={.01} width={null} style={{flex: 1}} color="#ff147c"/>
            </CardItem>
        </Card> 
    );

    render () { 
        return(
            <Container style={styles.container}>
                <Pagination 
                    dotColor={'rgba(255, 255, 255, 0.92)'}
                    inactiveDotColor={"black"}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    dotsLength={SAMPLE_CARD_DATA.length} 
                    activeDotIndex={this.state.activeCard}
                    carouselRef={this._carousel} 
                    tappableDots={!!this._carousel} >
                </Pagination>
                <Carousel
                    ref={c => { this._carousel = c; }}
                    data={SAMPLE_CARD_DATA}
                    renderItem={this._renderCard}
                    sliderWidth={ Dimensions.get("window").width }
                    itemWidth={ Dimensions.get("window").width - 50 }
                    centerContent={true}
                    contentContainerCustomStyle={{ paddingBottom: 10 }}
                    style={{ flex:1, overflow: "auto", alignSelf: "stretch" }}
                    onSnapToItem={(index) => this.setState({ activeCard: index }) }
                />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
    },
    cardContainer: {
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: 10,
        margin: 10,
        shadowColor: 'black',
        shadowRadius: 7,
        shadowOffset: { width: 5, height: 7},
        shadowOpacity: .5
    },
    cardHeader: {
        height: 300,
        borderRadius: 30,
    },
    cardImage: {
        height: 100,
        flex: 1
    },
    cardContent: {
        padding: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    cardActionsContainer: {

    },
    cardSeeMore: {

    }
})