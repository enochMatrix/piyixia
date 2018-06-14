import React, {Component} from 'react';
import {ListView, RefreshControl, TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import {Card, CardTitle, CardContent, CardAction, CardButton, CardImage} from 'react-native-cards';
import DynamicListRow from "../../components/DynamicListRow/DynamicListRow";
import Icon from 'react-native-vector-icons/Ionicons';

class RefreshableList extends Component {

    // set state and list view data
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            refreshing: false,
            dataSource: ds.cloneWithRows(['row 1', 'row 1','row 2','row 2']),
        };
    }

    // // fetch Data
    // componentDidMount() {
    //     this.fetchTopicsData();
    // }
     // user fetch data and refresh page , call spiner

    _onRefresh() {
        this.setState({refreshing: true});
        // fetchData().then(() => {
        //     this.setState({refreshing: false});
        // });
        // simulate fetch data process using setinterval

        setInterval( () => {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                refreshing: false,
                dataSource: ds.cloneWithRows(['row 3','row 1','row 1', 'row 2','row 2']),
            });
        }, 2000)
    }

    onItemSelectedHandler = () => {

        this.props.navigator.push({
            screen: "awesome-places.MatrixDetail",
            title: "Detail Page",
            })
    };

    onJoinedHandler = () => {
        this.props.navigator.push({
            screen: "awesome-places.JoinedChallenge",
            title: "Joined",
        })
    };

    _renderRow = (rowData) => {
        return (
            <TouchableOpacity onPress={this.onItemSelectedHandler}>
            <DynamicListRow>
                <Card>
                    <CardImage
                        styel={{height: 100}}
                        source={{uri: 'http://bit.ly/2GfzooV'}}
                        title="Top 10 South African beaches"
                        resizeMode="contain"
                    />
                    <CardContent text={rowData} />
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
            </DynamicListRow>
            </TouchableOpacity>
        )
    };

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.onJoinedHandler}>
                <View style={styles.header}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Icon name="ios-briefcase" color="green" size={40}/>
                        <Text style={styles.text}> Joined</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent:'flex-end'}}>
                        <Text style={styles.text}>33 </Text>
                        <Icon name="ios-arrow-forward" size={40}/>
                    </View>
                </View>
                </TouchableOpacity>
            <ListView
                style={this.state.refreshing ? {paddingTop: 50} : null }
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        colors={['black','blue']}
                        progressViewOffset={10}/>
                }
                removeClippedSubviews/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
   header: {
       padding: 10,
       flexDirection: 'row',
        justifyContent: 'space-evenly',
       alignItems: 'center',
       width: '100%',
       height: 50,
       backgroundColor: '#a9a9a9',
   },
    text: {
        fontWeight: 'bold',
        alignItems: 'center',
        fontSize: 30
    }
});


export default RefreshableList;
