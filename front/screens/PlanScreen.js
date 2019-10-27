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

// import SwipeCard from '../components/SwipeCard';

SAMPLE_CARD_DATA = [
    {
        id: uuid(),
        type: 'transport',
        action_type: 'car',
        action_date: 'today',
        text: `Today you used an Uber for 1 hour, taking the bike instead tomorrow will improve your carbon emissions by 5%`,
        substitute_timespan: 'week',
        substitute: 'bike',
        substitute_times: 4
    },
    {
        id: uuid(),
        type: 'food',
        action_type: 'eat',
        action_date: 'week',
        text: `Today you used a car for 3 hour, taking the bike instead tomorrow will improve your carbon emissions by 10%`,
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
                <Text p>
                    {item.text}
                </Text>
                {/* <Right>
                    <Text style={styles.seeMore}>See more...</Text>
                </Right> */}
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
        shadowRadius: 10,
        shadowOffset: { width: 5, height: 5},
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