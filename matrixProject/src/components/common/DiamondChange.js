import React, {Component} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Text, Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class DiamondChange extends Component{
    render() {
        return (
            <View style={styles.container}>
                    <TouchableWithoutFeedback onPress = {this.props.diamondRemove}>
                        <View>
                            <Icon name='md-remove' size={40} style={{fontWeight: 'bold'}}/>
                        </View>
                    </TouchableWithoutFeedback>
                <View style={styles.label}>
                    <Text style={{fontSize: 24, fontWeight: 'bold', padding: 10}}>
                        {this.props.increment} * {this.props.amount}
                    </Text>
                </View>
                    <TouchableWithoutFeedback onPress = {this.props.diamondAdd}>
                        <View>
                            <Icon name='md-add' size={40}/>
                        </View>
                    </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#eee',
        justifyContent: 'space-between',
        margin: 10,
    },
    label: {
        paddingLeft: 10,
        paddingRight: 10,
    },
});

export default DiamondChange;