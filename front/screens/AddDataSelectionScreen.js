import React from 'react';

import {
    FlatList,
    StyleSheet
} from 'react-native';

import {
    Block,
    Text
} from 'galio-framework'

import { 
    Ionicons,
    MaterialIcons,
    MaterialCommunityIcons,
  } from '@expo/vector-icons';

import Constants from 'expo-constants';

import uuidv4 from 'uuid/v4';
import { TouchableOpacity } from 'react-native-gesture-handler';


const TEST_DATA = [
    {
        id: uuidv4(),
        name: 'Commute',
        selected: true
    },
    {
        id: uuidv4(),
        name: 'Eat',
        selected: false
    },
    {
        id: uuidv4(),
        name: 'Drink',
        selected: false
    },
]

class AddDataSelectionScreen extends React.Component {
    static navigationOptions = {
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.navigation.getParam('data', []),
            selected: this.props.navigation.getParam('selected', null)
        }
    }

    componentWillUpdate() {
        this.setState({
            data: [...this.props.navigation.getParam('data', [])]
        })
    }

    _updateSelected = selected => this.setState({selected})

    _renderItem = ({item}) => {
        let select = this.props.navigation.getParam('onSelect');
        return (
        <TouchableOpacity onPress={() => {
            select(item.name);
            this.props.navigation.pop();
        }}>
            <Text h3 bold style={[styles.listItem, {
                color: item.name == this.state.selected ? 'red' : 'black'
            }]}>
                {item.name}
            </Text>
        </TouchableOpacity>
        )
    }

    render() {
        return (
            <Block style={styles.container}>
                <Ionicons name="ios-arrow-back" size={40} color="black" style={styles.backIcon} onPress={() => this.props.navigation.pop()}/>
                <Text h4 style={styles.heading}>
                    What you did was
                </Text>
                <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem}
                    keyExtractor={item => item.id}
                    style={styles.listItems}
                />
            </Block>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        padding: 35,
        paddingTop: Constants.statusBarHeight
    },
    listItem: {
        marginBottom: 15
    },
    listItems: {
        paddingTop: 40
    },
    backIcon: {
        position: 'absolute',
        marginTop: Constants.statusBarHeight + 5,
        marginLeft: 14
    },
    heading: {
        marginBottom: 14,
        marginTop: Constants.statusBarHeight + 25,
    }
}) 

export default AddDataSelectionScreen;