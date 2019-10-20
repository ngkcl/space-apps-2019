import React from 'react';


import {
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

import { Input, Block, Text } from 'galio-framework';
import { theme, withGalio, GalioProvider } from 'galio-framework'

import { SvgXml } from 'react-native-svg';
import hand from "../assets/hand"

import uuidv4 from 'uuid/v4';

const DATA_REPRESENTATION = {
    dataTypes: {
        'Commute': {
            1: {
                'headline': 'with',
                'options': [
                    {
                        id: uuidv4(),
                        'name': 'Tube',
                        'selected': false
                    },
                    {
                        id: uuidv4(),
                        'name': 'Bus',
                        'selected': false
                    },
                    {
                        id: uuidv4(),
                        'name': 'Tram',
                        'selected': false
                    }
                ],
                'defaultOption': 'Something'
            },
            2: {
                'headline': 'for',
                'options': Array(10).fill({}).map((el, i) => ({id: uuidv4(), 'name': '' + (i + 1) + ' hours', 'selected': false})),
                'defaultOption': 'Time'
            },
        },
        'Eat': {
            1: {
                'headline': 'and I had',
                'options': [
                    {
                        id: uuidv4(),
                        'name': 'Burger',
                        'selected': false
                    },
                    {
                        id: uuidv4(),
                        'name': 'Bananas',
                        'selected': false
                    },
                    {
                        id: uuidv4(),
                        'name': 'Beef',
                        'selected': false
                    },
                    {
                        id: uuidv4(),
                        'name': 'Chicken',
                        'selected': false
                    }
                ],
                'defaultOption': 'Something'
            },
            2: {
                'headline': 'weighing',
                'options': Array(10).fill({}).map((el, i) => ({'id': uuidv4(), 'name': '' + (i*100 + 100) + ' grams', 'selected': false})),
                'defaultOption': 'Grams'
            },
        }
    },
    lastField: {
        'headline': 'and I did that',
        'options': [
            {
                id: uuidv4(),
                'name': 'Today',
                'selected': false
            },
            {
                id: uuidv4(),
                'name': 'Yesterday',
                'selected': false
            },
            {
                id: uuidv4(),
                'name': 'Last Week',
                'selected': false
            },
            {
                id: uuidv4(),
                'name': 'Last Month',
                'selected': false
            }
        ],
        'defaultOption': 'When'
    }
}

DEFAULT_STATE = {
    dataType: null,
    selection: null,
    quantity: null,
    date: null
}

class AddScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
           ...DEFAULT_STATE
        };
    }
    
    _selectType = sel => {
        // alert("selected " + JSON.stringify(sel));
        if (Object.keys(sel)[0] == 'dataType') {
            this.setState({...DEFAULT_STATE})
        }
        this.setState({...sel})
    }
    
    render() {
        let allDataTypes = [...Object.keys(DATA_REPRESENTATION.dataTypes).map(k => ({id: uuidv4(), name: k, selected: false}))];
        let dataForType = DATA_REPRESENTATION.dataTypes[(this.state.dataType || 'Commute')];
        let lastFieldData = DATA_REPRESENTATION.lastField;

        return (
            <Block style={styles.container}>
                <SvgXml height="260" width="160" xml={hand} style={styles.handPic}/>
                <Text muted p>What I did was</Text>
                <TouchableOpacity style={styles.inputButton} onPress={() => this.props.navigation.push('AddData', {
                    data: allDataTypes, 
                    onSelect: sel => this._selectType({'dataType': sel}),
                    selected: this.state['dataType']
                }
                )}>
                    <Text h3 bold>{this.state.dataType || "Anything"}</Text>
                </TouchableOpacity>
                {
                    Object.keys(dataForType).map((k, i) => {
                        let data = dataForType[k];
                        let selectionType = (i == 0) ? 'selection' : 'quantity'; 

                        return (<Block key={k}>
                            <Text muted p>{data.headline}</Text>
                            <TouchableOpacity style={styles.inputButton} onPress={() => this.props.navigation.push('AddData', {
                                data: data.options,
                                onSelect: sel => this._selectType({[selectionType]: sel}),
                                selected: this.state[selectionType]
                            })}>
                                <Text h3 bold>{this.state[selectionType] || data.defaultOption}</Text>
                            </TouchableOpacity>
                        </Block>);
                    })
                }
                <Text muted p>{lastFieldData.headline}</Text>
                <TouchableOpacity style={styles.inputButton} onPress={() => this.props.navigation.push('AddData', {
                    data: lastFieldData.options,
                    onSelect: sel => this._selectType({'date': sel}),
                    selected: this.state['date']
                })}>
                    <Text h3 bold>{this.state['date'] || lastFieldData.defaultOption}</Text>
                </TouchableOpacity>
            </Block>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 33,
        paddingTop: 125,
        lineHeight: 50
    },
    inputButton: {
        marginBottom: 25    
    },
    handPic: {
        position: 'absolute',
        right: -20,
        top: 30,
        transform: [{rotate: '-40deg'}]
    }
})

export default AddScreen;