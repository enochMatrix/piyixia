import React from 'react';
import {View,StyleSheet} from 'react-native';
import Listitem from '../Listitem/Listitem';

const placeOutput = (props) => {
    const styles = StyleSheet.create({
        listContainer: {
            width: "100%"
        }
    });

    return (
        <View style={styles.listContainer}>
            {props.places.map((place,i) => (
                <Listitem key={i} placeName={place}/>
            ))}
        </View>
    )
};

export default placeOutput;