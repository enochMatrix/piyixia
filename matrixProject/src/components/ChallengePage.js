import React, {Component} from 'react';
import {ListView, RefreshControl, TouchableOpacity, View, StyleSheet, Text,Button} from 'react-native';
import {Card, CardContent, CardAction, CardButton, CardImage} from 'react-native-cards';
import DynamicListRow from "./common/DynamicListRow";
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import PopupDialog,{
    DialogTitle,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
    FadeAnimation,
} from 'react-native-popup-dialog';

// const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });
// const scaleAnimation = new ScaleAnimation();
// const fadeAnimation = new FadeAnimation({ animationDuration: 150 });

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

    // state = {
    //     dialogShow: false,
    // };



    // showSlideAnimationDialog = () => {
    //     this.slideAnimationDialog.show();
    // };



    // renderScene = () => (
    //     <View style={styles.container}>
    //         <Button
    //             title="Show Dialog - Slide Animation"
    //             onPress={this.showSlideAnimationDialog}
    //         />
    //     </View>
    // );

    // // fetch Data
    // componentDidMount() {
    //     this.fetchTopicsData();
    // }
    // user fetch data and refresh page , call spiner
    showFadeAnimationDialog = () => {
        this.fadeAnimationDialog.show();
    }

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
        this.props.navigation.navigate('ChallengeDetailPage')
    };

    onJoinedHandler = () => {
        this.props.navigation.navigate('JoinedChallenge')
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
                {/*<ListView*/}
                    {/*style={this.state.refreshing ? {paddingTop: 50} : null }*/}
                    {/*dataSource={this.state.dataSource}*/}
                    {/*renderRow={this._renderRow.bind(this)}*/}
                    {/*refreshControl={*/}
                        {/*<RefreshControl*/}
                            {/*refreshing={this.state.refreshing}*/}
                            {/*onRefresh={this._onRefresh.bind(this)}*/}
                            {/*colors={['black','blue']}*/}
                            {/*progressViewOffset={10}/>*/}
                    {/*}*/}
                    {/*removeClippedSubviews/>*/}
                {/*<ActionButton buttonColor="rgba(231,76,60,1)">*/}
                    {/*<ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>*/}
                        {/*<Icon name="md-create" style={styles.actionButtonIcon} />*/}
                    {/*</ActionButton.Item>*/}
                    {/*<ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>*/}
                        {/*<Icon name="md-notifications-off" style={styles.actionButtonIcon} />*/}
                    {/*</ActionButton.Item>*/}
                    {/*<ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>*/}
                        {/*<Icon name="md-done-all" style={styles.actionButtonIcon} />*/}
                    {/*</ActionButton.Item>*/}
                {/*</ActionButton>*/}

                <Button
                    title="Show Dialog - Default Animation"
                    onPress={this.showFadeAnimationDialog}
                />
                <PopupDialog
                    ref={(fadeAnimationDialog) => {
                        this.fadeAnimationDialog = fadeAnimationDialog;
                    }}
                    dialogTitle={<DialogTitle title="Popup Dialog - Default Animation" />}
                >
                    <View style={styles.dialogContentView}>
                        <Text>Default Animation</Text>
                    </View>
                </PopupDialog>

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
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    dialogContentView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default RefreshableList;