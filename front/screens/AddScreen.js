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

class AddScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <Block style={styles.container}>
                <SvgXml height="210" width="155" xml={hand} style={styles.handPic}/>
                <Text muted p>What I did was</Text>
                <TouchableOpacity style={styles.inputButton}>
                    <Text h3 bold>Anything</Text>
                </TouchableOpacity>
                {/* <Input color={theme.COLORS.INFO} style={{ borderColor: theme.COLORS.INFO }} placeholderTextColor={theme.COLORS.INFO} />             */}
                <Text muted p>with</Text>
                <TouchableOpacity style={styles.inputButton}>
                    <Text h3 bold>Something</Text>
                </TouchableOpacity>
                {/* <Input color={theme.COLORS.INFO} style={{ borderColor: theme.COLORS.INFO }} placeholderTextColor={theme.COLORS.INFO} />             */}
                <Text muted p>for</Text>
                <TouchableOpacity style={styles.inputButton}>
                    <Text h3 bold>Time</Text>
                </TouchableOpacity>
                <Text muted p>and I did that</Text>
                <TouchableOpacity style={styles.inputButton}>
                    <Text h3 bold>Transport</Text>
                </TouchableOpacity>
                {/* <Input color={theme.COLORS.INFO} style={{ borderColor: theme.COLORS.INFO }} placeholderTextColor={theme.COLORS.INFO} />           */}
            </Block>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 33,
        paddingTop: 90,
        lineHeight: 50
    },
    inputButton: {
        marginBottom: 20
    },
    handPic: {
        position: 'absolute',
        right: -20,
        top: 30,
        transform: [{rotate: '-40deg'}]
    }
})

export default AddScreen;