import React from 'react';
import {StyleSheet,FlatList} from 'react-native';
import ListItem from '../ListItem/ListItem';

const list=(props)=> {


    return (

            <FlatList
                style={styles.listContainer}
            data={props.places}
            renderItem={(info)=>(
                <ListItem
                          placeName={info.item.name}
                          placeImage={info.item.image}
                          placeLocation={info.item.location}
                          onItemPressed={()=>props.onItemSelected(info.item.key)}/>

            )}/>
    );
};


const styles = StyleSheet.create({
    listContainer:{
        width:"100%"
    }

});

export default list;