import * as React from 'react';
import Icon from 'react-native-vector-icons';
import {Card, CardContent, CardAction, CardButton, CardImage} from 'react-native-cards';
import { View } from 'react-native';

export default class ListCards extends React.Component {

    render () {
        return (

            <Card>
                <CardImage
                    styel={{height: 100}}
                    source={{uri: 'http://bit.ly/2GfzooV'}}
                    title="Top 10 South African beaches"
                    resizeMode="contain"
                />
                <CardContent text={this.props.data} />
                <CardAction
                    separator={true}
                    inColumn={false}
                >
                    <View style={{flex: 1, flexDirection: "row", padding: 0}}>
                        <Icon name="ios-star" size={40} color="green"/>
                        <CardButton
                            onPress={() => {}}
                            title="3.1K"
                            color="#FEB557"
                            style={{padding: 0}}
                        />
                    </View>
                    <View style={{flex: 1, flexDirection: "row"}}>
                        <Icon name="ios-chatbubbles" size={40} color="black"/>
                        <CardButton
                            onPress={() => {}}
                            title="200"
                            color="#FEB557"
                        />
                    </View>
                    <View style={{flex: 1, flexDirection: "row"}}>
                        <CardButton
                            onPress={() => {}}
                            title="Sponsor"
                            color="#FEB557"
                        />
                    </View>
                </CardAction>
            </Card>
        )
    }
}
