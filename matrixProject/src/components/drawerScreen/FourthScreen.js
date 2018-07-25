import React from 'react';
import  {Text, View , Button, Image, List, FlatList, ListItem,StyleSheet} from 'react-native';
import {DrawerActions} from "react-navigation";
import { Header, Left, Icon, Right} from 'native-base';
import YesOrNo from '../common/YesOrNo';

export default class FourthScreen extends React.Component {
    // static navigationOptions= {
    //     // title:'qqq',
    //     tabBarLabel:'screen 1',
    //     drawerIcon :()=>{
    //         return (
    //             <View>
    //                 <Text>设置</Text>
    //             </View>
    //         );
    //     }
    // };



    state={
        data:[{title: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容', key: 'item1', time:'2018-10-24'},
            {title: '您已经赞助挑战您已经赞助挑战您已经赞助挑战您已经赞助挑战您已经赞助挑战您已经赞助挑战您已经赞助挑战', key: 'item2', time:'2018-10-24'},
            {title: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容', key: 'item1', time:'2018-10-24'},
            {title: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容', key: 'item1', time:'2018-10-24'},
            {title: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容', key: 'item1', time:'2018-10-24'},
            {title: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容', key: 'item1', time:'2018-10-24'},
            {title: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容', key: 'item1', time:'2018-10-24'},],

        commentModalVisible: true,
    };

    _renderItem = ({item}) => (
        <View >
            <Text style={styles.bubble}>
                {item.title}
            </Text>
            <Text style={styles.time}>
                {item.time}
            </Text>
        </View>

    );
    _keyExtractor = (item, index) => item.key;


    render(){
        return(
            <View>


                <View style={{height:'20%', backgroundColor:'grey'}}>
                    <Icon name='menu'
                          onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer())}/>

                    <Text>头像</Text>
                </View>
                <View style={styles.List} >

                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between',}}>
                        {/*<Icon name='chatboxes' style={{width: '10%'}}/>*/}
                        <View>
                            <Text style={{width: '50%',}}>消息列表</Text>
                        </View>



                        <View>
                            <Text style={{width: '50%',}}>删除全部</Text>
                            {/*<Icon name='pint' style={{width: '10%'}}/>*/}
                        </View>
                    </View>

                </View>
                <View style={styles.container}>
                    <View >
                        <FlatList data={this.state.data}
                                  renderItem = {this._renderItem}
                                  keyExtractor={this._keyExtractor}/>
                    </View>


                </View>
                <YesOrNo visible={this.state.commentModalVisible}
                         children='是否退出登入'

                         onPressNo={() => { this.setState({ commentModalVisible: false }); }}
                         />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    bubble: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: StyleSheet.hairlineWidth,
        padding: 10,
        borderRadius: 6,

    },
    time: {
        textAlign: 'right',
        color: '#bababa',
        fontSize: 12,
    },
    List:{
        height: '5%',
        borderBottomWidth :3,
        borderBottomColor: '#000',
        marginBottom: 8,
        paddingBottom:1,
        display:'flex',
        flexDirection: 'row',

    }

})
