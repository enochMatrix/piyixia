import React, {Component} from 'react';
import {ListView, RefreshControl, TouchableOpacity, View, StyleSheet, Text,Button,TouchableHighlight, Dimensions} from 'react-native';
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

const {width, height} = Dimensions.get('window');
const navigatorH = 64; // navigator height
const [aWidth, aHeight] = [width, 108];



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
        this.continueAnimationDialog = this.continueAnimationDialog.bind(this);
    }

    // state = {
    //     dialogShow: false,
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
    };

    cancelAnimationDialog =() => {
        this.fadeAnimationDialog.dismiss();
    };
    continueAnimationDialog = ()=> {
        this.props.navigation.navigate('commentPage');
    };
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
                    dialogTitle={<DialogTitle title="Confirmation Information"
                    style={styles.dialogTitle}/>}
                >
                    <View style={styles.dialogContent}>
                        <Text style={styles.dialogText}>
                            Confirmation Information
                        </Text>
                        <View style={styles.dialogContentView}>
                            <TouchableHighlight style={styles.cancelBtnView} underlayColor='#f0f0f0'
                                                onPress={this.cancelAnimationDialog}>
                                <Text style={styles.cancelBtnText}>取消</Text>
                            </TouchableHighlight>
                            // 按下确认键，跳转到另外一个界面；
                            <TouchableHighlight style={styles.okBtnView}
                                                onPressIn={this.continueAnimationDialog}
                                                underlayColor='#f0f0f0'>
                                <Text style={styles.okBtnText}>确定</Text>
                            </TouchableHighlight>
                        </View>
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
    //控制内容加上两个按钮
    dialogContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'column'
    },
    dialogText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize:45
    },
    //让 继续 和 取消按钮在一行上
    //控制两个按钮
    dialogContentView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row'
    },
    dialogTitle:{
      height:88
        //???????
    },
    cancelBtnView:{
        width:aWidth/2,
        height: 44,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth:1/2,
        borderColor:'#f0f0f0',
        flexDirection:'row'
    },
    cancelBtnText: {
        fontSize:17,
        color:"#e6454a",
        textAlign:"center",
        fontWeight:'bold',
    },
    okBtnView:{
        width:aWidth/2,
        height: 44,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row'
    },
    okBtnText: {
        fontSize:17,
        color:"#e6454a",
        textAlign:"center",
    },
});


export default RefreshableList;