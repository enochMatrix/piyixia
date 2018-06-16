import * as React from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView, Image } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

const FirstRoute = () => (
    <View style={styles.container}>
        <ScrollView >
            <Text style={{fontSize: 24, margin: 10}}>
                IceBucket Challenge
            </Text>
            <Image style={{width: "100%", height: 200}}
                   resizeMode="cover"
                   source={{uri: 'https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg?resize=640%2C426'}}/>
        </ScrollView>
    </View>
);
const SecondRoute = () => (
    <View style={styles.container}>
        <ScrollView >
            <Text style={{fontSize: 24, margin: 10}}>
                IceBucket Challenge
            </Text>
            <Image style={{width: "100%", height: 200}}
                   resizeMode="cover"
                   source={{uri: 'http://globalmedicalco.com/photos/globalmedicalco/1/3586.jpg'}}/>
        </ScrollView>
    </View>
);

export default class JoinedChallenge extends React.Component {

    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'Created (19)' },
            { key: 'second', title: 'Sponsored (13)' },
        ],
    };

    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    first: FirstRoute,
                    second: SecondRoute,
                })}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get('window').width,
                    height: 0, }}
            />
        );
    }
}
