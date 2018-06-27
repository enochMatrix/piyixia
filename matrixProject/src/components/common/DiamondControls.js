import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import DiamondChange from './DiamondChange';
import Icon from 'react-native-vector-icons/Ionicons';

const controls = [
    {type: 'ten'},
    {type: 'hundred'},
    {type: 'thousand'},
];

class DiamondControls extends Component {

    state = {
        diamondType: {
            ten: {
                increment: 10,
                amount: 0
            },
            hundred: {
                increment: 100,
                amount: 0
            },
            thousand: {
                increment: 1000,
                amount: 0
            },
        },
        totalAmount: 0
    };

    diamondAddHandler = (type) => {

        const oldCount = this.state.diamondType[type].amount;

        const updatedCount = oldCount + 1;

        const updatedDiamondType = {
            ...this.state.diamondType
        };

        updatedDiamondType[type].amount = updatedCount;

        const oldTotalAmount = this.state.totalAmount;

        const amountAddition = this.state.diamondType[type].increment;

        const updatedTotalAmount = oldTotalAmount + amountAddition;

        this.setState({
            diamondType: updatedDiamondType,
            totalAmount: updatedTotalAmount,
        })
    };

    diamondRemoveHandler = (type) => {

        const oldCount = this.state.diamondType[type].amount;

        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;

        const updatedDiamondType = {
            ...this.state.diamondType
        };

        updatedDiamondType[type].amount = updatedCount;

        const oldTotalAmount = this.state.totalAmount;

        const amountAddition = this.state.diamondType[type].increment;

        const updatedTotalAmount = oldTotalAmount - amountAddition;

        this.setState({
            diamondType: updatedDiamondType,
            totalAmount: updatedTotalAmount,
        })
    };

    render() {
        console.log(this.state.diamondType['ten'].amount);
        return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={{fontSize: 24, fontWeight: 'bold'}}>Balance: 443234</Text>
                <Text style={{color: 'blue'}}> Recharge</Text>
                <TouchableWithoutFeedback onPress={this.props.close}>
                <View><Icon name='md-close' size={40}/></View>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.diamondControls}>
                {controls.map( ctrl =>
                <DiamondChange
                    key={ctrl.type}
                    diamondAdd = {() => this.diamondAddHandler(ctrl.type)}
                    diamondRemove = {() => this.diamondRemoveHandler(ctrl.type)}
                    increment = {this.state.diamondType[ctrl.type].increment}
                    amount = {this.state.diamondType[ctrl.type].amount}
                    />)}
            </View>
            <View style={styles.bottomTab}>
                <View style={{flexDirection: 'row', marginLeft: 5, marginRight: 5}}>
                    <Text style={{fontSize: 24, color: 'white', marginRight: 10}}>Total:  </Text>
                    <Text style={{fontSize: 32, fontWeight: 'bold', color: 'white'}}>{this.state.totalAmount}</Text>
                </View>
                <TouchableWithoutFeedback onPress={this.props.close}>
                    <View>
                        <Text style={{fontSize: 28, color: 'white'}}>| Sponsor Now</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        margin: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    diamondControls: {
        flex: 1,
    },
    bottomTab: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'green',
        padding: 5,
    }
});

export default DiamondControls;