import React from 'react';

import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    FlatList,
    Image
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

import LottieView from "lottie-react-native";

import Constants from 'expo-constants';

import uuid from 'uuid/v4';

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
    // {
    //     id: uuid(),
    //     type: 'transport',
    //     action_type: 'car',
    //     action_date: 'today',
    //     text: `Today you used a car for 3 hour, taking the bike instead tomorrow will improve your carbon emissions by 10%`,
    //     substitute_timespan: 'week',
    //     substitute: 'bike',
    //     substitute_times: 4
    // }
]

export default class PlanScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.subscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
                this.animation.play();
            }
        );
    }

    _renderCard = ({item, index, separators}) => (
        <Card
            style={styles.cardContainer}
        >
            <CardItem cardBody style={styles.cardHeader}>
                <LottieView
                    source={require('../assets/bike.json')}
                    style={styles.cardImage}
                    ref={animation => this.animation = animation}
                />   
                {/* <Image source={{uri: 'https://img.memecdn.com/sorry-babe-nasa-needs-me_o_1032877.jpg'}} style={styles.cardImage}/> */}
            </CardItem>
            {/* <CardItem style={styles.cardActionsContainer}> */}
                {/* TODO: Actions */}
            {/* </CardItem> */}
            <CardItem style={styles.cardContent}>
                <Text>
                    {item.text}
                </Text>
                <Right>
                    <Text style={styles.seeMore}>See more...</Text>
                </Right>
            </CardItem>

        </Card>   
    );

    render () { 
        return(
            <Container style={styles.container}>
                <Content>
                    <FlatList
                        styles={styles.cardsList}
                        data={SAMPLE_CARD_DATA}
                        renderItem={this._renderCard}
                        keyExtractor={item => item.text}
                    />
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        paddingLeft: 14,
        paddingRight: 14,
        backgroundColor: 'purple'
    },
    cardsList: {

    },
    cardContainer: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: 10,
        margin: 10
    },
    cardHeader: {
        borderRadius: 30,
    },
    cardImage: {
        height: 100,
        flex: 1
    },
    cardContent: {
        borderRadius: 15

    },
    cardActionsContainer: {

    },
    cardSeeMore: {

    }
})